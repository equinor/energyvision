export type FieldVisibilityRule = Record<string, string[]>

export const fieldVisibilityRules = {
  isCampaign: ['admin'], // Visible only to admins add the field names ..
}
