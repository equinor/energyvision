import { z } from 'zod'
import {
  contentRegex,
  emailRegex,
  englishTextRegex,
  nameRegex,
  phoneRegex,
  urlRegex,
} from '@/templates/forms/validations'

const AllowedCategoriesSubscribeForm = [
  'generalNews',
  'magazineStories',
  'stockMarketAnnouncements',
  'crudeOilAssays',
] as const

export const subscribeSchema = z.object({
  // The 'refine' function validates the array, checking for a minimum length of 1
  categories: z
    .array(z.enum(AllowedCategoriesSubscribeForm))
    .min(1, { message: 'At least one category must be selected' }),
  email: z.email().nonempty('Email is required'),
})

// PensionForm Schema
export const pensionFormSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .regex(nameRegex, 'Not valid input'),
  email: z
    .string()
    .nonempty('Email is required')
    .regex(emailRegex, 'Email is not valid'),
  pensionCategory: z.string().optional(),
  requests: z
    .string()
    .nonempty('Request is required')
    .regex(contentRegex, 'Not valid input'),
})

// CareerFairForm Schema
export const careerFairFormSchema = z.object({
  organisation: z
    .string()
    .nonempty('Organisation is required')
    .regex(/^[a-zA-Z0-9 ]*$/, 'Not valid input'),
  contactPerson: z
    .string()
    .nonempty('Contact person is required')
    .regex(nameRegex, 'Not valid input'),
  phone: z
    .string()
    .nonempty('Phone is required')
    .regex(phoneRegex, 'Not valid phone number'),
  email: z
    .string()
    .nonempty('Email is required')
    .regex(emailRegex, 'Email is not valid'),
  event: z.string().optional(),
  eventDescription: z
    .string()
    .nonempty('Event description is required')
    .regex(contentRegex, 'Not valid input'),
  website: z
    .string()
    .optional()
    .refine(val => !val || urlRegex.test(val), 'Not valid input'),
  supportingDocuments: z.string().optional(),
  preferredLang: z.string().optional(),
})

// OrderReportsForm Schema
export const orderReportsFormSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .regex(nameRegex, 'Not valid input'),
  email: z
    .string()
    .nonempty('Email is required')
    .regex(emailRegex, 'Email is not valid'),
  company: z.string().nonempty('Company is required'),
  address: z.string().nonempty('Address is required'),
  zipcode: z
    .string()
    .nonempty('Zipcode is required')
    .regex(englishTextRegex, 'Not valid input'),
  city: z
    .string()
    .nonempty('City is required')
    .regex(nameRegex, 'Not valid input'),
  country: z
    .string()
    .nonempty('Country is required')
    .regex(nameRegex, 'Not valid input'),
  reports: z.array(z.string()).nonempty('At least one report must be selected'),
})

// CareersContactForm Schema
export const careersContactFormSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .regex(nameRegex, 'Not valid input'),
  email: z
    .string()
    .nonempty('Email is required')
    .regex(emailRegex, 'Email is not valid'),
  phone: z
    .string()
    .nonempty('Phone is required')
    .regex(phoneRegex, 'Not valid phone number'),
  category: z.string().optional(),
  questions: z
    .string()
    .nonempty('Questions are required')
    .regex(contentRegex, 'Not valid input'),
  positionId: z
    .string()
    .optional()
    .refine(val => !val || englishTextRegex.test(val), 'Not valid input'),
  preferredLang: z.string().optional(),
  candidateType: z.string().optional(),
  supportingDocuments: z.string().optional(),
  location: z
    .string()
    .nonempty('Location is required')
    .regex(nameRegex, 'Not valid input'),
})

// ContactEquinorForm Schema
export const contactEquinorFormSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .regex(nameRegex, 'Not valid input'),
  email: z
    .string()
    .nonempty('Email is required')
    .regex(emailRegex, 'Email is not valid'),
  category: z.string().optional(),
  message: z
    .string()
    .nonempty('Message is required')
    .regex(contentRegex, 'Not valid input'),
})
