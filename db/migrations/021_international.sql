-- A company's address as it is written in its country: the street line, a postal code where the country has them (the
-- Emirates have none), and a region for a state, province or prefecture.
alter table crm.companies add column street text, add column postal_code text, add column region text;

-- Many people have one name and no family name, as is common in Indonesia and among Malay Singaporeans.
alter table crm.people alter column last_name drop not null;

-- The payroll import cut names at 60 characters; two family names or a patronymic make a longer one.
alter table hr."EMP_MASTER" alter column "EMP_NAME" type varchar(200);
