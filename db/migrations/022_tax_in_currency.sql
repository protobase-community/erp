-- Invoice tax rounded to the organization's currency, whole yen rather than cents for an organization in Japan, in
-- place of 008_calculated_totals.sql's two decimals. Totals already stored stay as they are until their lines change.
create function sales.tax_decimals(organization integer) returns integer language sql stable as $$
  select coalesce(least(c.decimals, 2), 2)
  from core.organizations o join core.currencies c on c.code = o.currency_code
  where o.id = organization
$$;

create or replace function sales.refresh_invoice_totals(ids bigint[]) returns void language sql as $$
  update sales.invoices i
  set subtotal = s.subtotal,
      vat = s.vat,
      total = s.subtotal + s.vat
  from (
    select inv.id, t.subtotal, round(t.subtotal * inv.vat_rate / 100, sales.tax_decimals(inv.organization_id)) as vat
    from sales.invoices inv
    cross join lateral (select coalesce((select sum(l.line_total) from sales.invoice_lines l where l.invoice_id = inv.id), 0) as subtotal) t
    where inv.id = any (ids)
  ) s
  where i.id = s.id
    and (i.subtotal, i.vat, i.total) is distinct from (s.subtotal, s.vat, s.subtotal + s.vat)
$$;

create or replace function sales.invoice_apply_vat() returns trigger language plpgsql as $$
begin
  new.vat := round(new.subtotal * new.vat_rate / 100, sales.tax_decimals(new.organization_id));
  new.total := new.subtotal + new.vat;
  return new;
end $$;
