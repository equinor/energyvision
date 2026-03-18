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

export const subscribeSchema = (t: any) =>
  z.object({
    // The 'refine' function validates the array, checking for a minimum length of 1
    categories: z
      .array(z.enum(AllowedCategoriesSubscribeForm))
      .min(1, { message: 'At least one category must be selected' }),
    email: z.email().nonempty('Email is required'),
  })

// PensionForm Schema
export const pensionFormSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .nonempty(t('name_validation'))
      .regex(nameRegex, t('not_valid_input')),
    email: z
      .string()
      .nonempty(t('email_validation'))
      .regex(emailRegex, t('email_validation')),
    pensionCategory: z.string().optional(),
    requests: z
      .string()
      .nonempty(t('pension_form_what_is_your_request_validation'))
      .regex(contentRegex, t('not_valid_input')),
  })

// CareerFairForm Schema
export const careerFairFormSchema = (t: any) =>
  z.object({
    organisation: z
      .string()
      .nonempty(t('career_fair_form_organisation_validation'))
      .regex(/^[a-zA-Z0-9 ]*$/, t('not_valid_input')),
    contactPerson: z
      .string()
      .nonempty(t('career_fair_form_contact_person_validation'))
      .regex(nameRegex, t('not_valid_input')),
    phone: z
      .string()
      .nonempty(t('career_fair_form_phone_validation'))
      .regex(phoneRegex, t('career_fair_form_phone_validation')),
    email: z
      .string()
      .nonempty(t('email_validation'))
      .regex(emailRegex, t('email_validation')),
    event: z.string().optional(),
    eventDescription: z
      .string()
      .nonempty(t('career_fair_form_event_description_validation'))
      .regex(contentRegex, t('not_valid_input')),
    website: z
      .string()
      .optional()
      .refine(val => !val || urlRegex.test(val), t('not_valid_input')),
    supportingDocuments: z.string().optional(),
    preferredLang: z.string().optional(),
  })

// OrderReportsForm Schema
export const orderReportsFormSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .nonempty(t('name_validation'))
      .regex(nameRegex, t('not_valid_input')),
    email: z
      .string()
      .nonempty(t('email_validation'))
      .regex(emailRegex, t('email_validation')),
    company: z.string().nonempty(t('order_reports_form_company_validation')),
    address: z.string().nonempty(t('order_reports_form_address_validation')),
    zipcode: z
      .string()
      .nonempty(t('order_reports_form_zipcode_validation'))
      .regex(englishTextRegex, t('not_valid_input')),
    city: z
      .string()
      .nonempty(t('order_reports_form_city_validation'))
      .regex(nameRegex, t('not_valid_input')),
    country: z
      .string()
      .nonempty(t('order_reports_form_country_validation'))
      .regex(nameRegex, t('not_valid_input')),
    reports: z
      .array(z.string())
      .nonempty('At least one report must be selected'),
  })

// CareersContactForm Schema
export const careersContactFormSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .nonempty(t('name_validation'))
      .regex(nameRegex, t('not_valid_input')),
    email: z
      .string()
      .nonempty(t('email_validation'))
      .regex(emailRegex, t('email_validation')),
    phone: z
      .string()
      .nonempty(t('careers_contact_form_phone_validation'))
      .regex(phoneRegex, t('careers_contact_form_phone_validation')),
    category: z.string().optional(),
    questions: z
      .string()
      .nonempty(t('careers_contact_form_questions_validation'))
      .regex(contentRegex, t('not_valid_input')),
    positionId: z
      .string()
      .optional()
      .refine(
        val => !val || englishTextRegex.test(val),
        t('careers_contact_form_positionId_validation'),
      ),
    preferredLang: z.string().optional(),
    candidateType: z.string().optional(),
    supportingDocuments: z.string().optional(),
    location: z
      .string()
      .nonempty(t('careers_contact_form_location_validation'))
      .regex(nameRegex, t('not_valid_input')),
  })

// ContactEquinorForm Schema
export const contactEquinorFormSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .nonempty(t('name_validation'))
      .regex(nameRegex, t('not_valid_input')),
    email: z
      .string()
      .nonempty(t('email_validation'))
      .regex(emailRegex, t('email_validation')),
    category: z.string().optional(),
    message: z
      .string()
      .nonempty(t('contact_form_how_to_help_validation'))
      .regex(contentRegex, t('not_valid_input')),
  })
