import { z } from 'zod'

const AllowedCategories = [
  'generalNews',
  'magazineStories',
  'stockMarketAnnouncements',
  'crudeOilAssays',
] as const

export const subscribeSchema = z.object({
  // The 'refine' function validates the array, checking for a minimum length of 1
  categories: z
    .array(z.enum(AllowedCategories))
    .min(1, { message: 'At least one category must be selected' }),
  email: z.email().nonempty('Email is required'),
})
