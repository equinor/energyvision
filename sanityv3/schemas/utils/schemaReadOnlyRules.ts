export type SchemaReadOnlyRule = Record<string, string[]>
export const schemaReadOnlyRules: SchemaReadOnlyRule = {
  grid: ['designer'],
  campaignBanner: ['designer'], // change admin to designer after role is created.
}

export const getDesignerOnlySchemas = () => {
  return Object.keys(schemaReadOnlyRules)
}
