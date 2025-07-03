'use client'
import { CareersContactFormCatalogType } from '../../../types'
import { useTranslations } from 'next-intl'

export default function getCatalogType(
  translations,
  category: string,
  candidateType: string,
): CareersContactFormCatalogType | null {
  const t = useTranslations()
  const suspectedRecruitmentScam = intl.formatMessage({
    id: 'careers_contact_form_suspected_recruitment_scam',
    defaultMessage: 'Suspected recruitment scam',
  })
  const onboarding = intl.formatMessage({
    id: 'careers_contact_form_onboarding',
    defaultMessage: 'Onboarding',
  })

  const graduates = intl.formatMessage({
    id: ' careers_contact_form_graduates',
    defaultMessage: 'Graduates',
  })

  const interns = intl.formatMessage({
    id: 'careers_contact_form_interns',
    defaultMessage: 'Interns (e.g. summer, academic)',
  })
  const apprentices = intl.formatMessage({
    id: 'careers_contact_form_apprentices',
    defaultMessage: 'Apprentices/lærlinger',
  })

  if (category.includes(suspectedRecruitmentScam)) return 'suspectedRecruitmentScamRequest'
  else if (category.includes(onboarding)) return 'onboarding'
  else if (candidateType.includes(graduates) || candidateType.includes(interns) || candidateType.includes(apprentices))
    return 'emergingTalentsQueries'
  else return 'others'
}
