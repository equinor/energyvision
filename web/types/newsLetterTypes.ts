import { Level2Keys } from "@/lib/helpers/typescriptTyping"

export const newsletterCategoryMap = {
  no: {
    generalNews: 'generelle nyheter',
    Company: 'generelle nyheter',
    crudeOilAssays: 'crude oil assays',
    Crude: 'crude oil assays',
    magazineStories: 'magasinsaker',
    stockMarketAnnouncements: 'børsmeldinger',
    Stock: 'børsmeldinger',
  },
  en: {
    generalNews: 'general news',
    Company: 'general news',
    crudeOilAssays: 'crude oil assays',
    Crude: 'crude oil assays',
    magazineStories: 'magazine stories',
    stockMarketAnnouncements: 'stock market announcements',
    Stock: 'stock market announcements',
  },
}

export type newsletterCategoryLocale = keyof typeof newsletterCategoryMap
export type newsletterCategoryKeys = Level2Keys<typeof newsletterCategoryMap>