export const FORM_CATALOG_NUMBERS = {
  contactEquinor: 'CAT0012836',
  orderReports: 'CAT0012841',
  careersContactUs: 'CAT0012840',
  careerFairs: 'CAT0012839',
} as const

export type AllowedCatalogNumber =
  (typeof FORM_CATALOG_NUMBERS)[keyof typeof FORM_CATALOG_NUMBERS]

export const ALLOWED_CATALOG_NUMBERS = new Set<AllowedCatalogNumber>(
  Object.values(FORM_CATALOG_NUMBERS) as AllowedCatalogNumber[],
)
