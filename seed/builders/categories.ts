import { tree } from '../data/catalogTree'
import { slugify } from '../format'

/** A name in each catalog language. */
export type Names = { en: string; ja: string }

type Category = { name: Names; slug: string; parent: number | null; position: number }
type Base = { name: Names; price: number; category: number; code: string }

export const categories: Category[] = []
export const bases: Base[] = []

tree.forEach((root, rootPosition) => {
  const rootIndex = categories.length
  categories.push({ name: { en: root.name, ja: root.ja }, slug: slugify(root.name), parent: null, position: rootPosition })
  root.children.forEach((child, childPosition) => {
    const childIndex = categories.length
    categories.push({ name: { en: child.name, ja: child.ja }, slug: slugify(child.name), parent: rootIndex, position: childPosition })
    child.items.forEach(([name, price, ja]) => bases.push({ name: { en: name, ja }, price, category: childIndex, code: root.code }))
  })
})
