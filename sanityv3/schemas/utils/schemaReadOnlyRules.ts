export type SchemaReadOnlyRule = Record<string, string[]>
export const schemaReadOnlyRules: SchemaReadOnlyRule = {
  grid: ['admin'],
  campaignBanner: ['admin'], // change admin to designer after role is created.
}
