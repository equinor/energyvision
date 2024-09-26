export type SchemaReadOnlyRule = Record<string, string[]>
export const schemaReadOnlyRules: SchemaReadOnlyRule = {
  grid: ['admin'],
  campaignBanner: ['admin'],
  //admin: ['grid', /*'gridTextBlock', 'gridTeaser', 'threeColumns', 'span2and1', 'span3',*/ 'campaignBanner'],
}
