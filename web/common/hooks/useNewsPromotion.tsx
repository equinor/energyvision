import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getNameFromLocale } from '../../lib/localization'
import type { CardData, PromotionData, Tag } from '../../types/types'

type getNewsDataProps = {
  type: string
  tags?: Tag[]
  countryTags?: Tag[]
  localNewsTags?: Tag[]
  lang: string
}

const getNewsData = async ({
  type,
  countryTags,
  localNewsTags,
  tags,
  lang,
}: getNewsDataProps): Promise<CardData[] | false> => {
  const params = {
    type,
    lang,
    tags,
    localNewsTags,
    countryTags,
  }

  const response = await fetch('/api/get-promotion-data', { method: 'post', body: JSON.stringify(params) })

  if (response.status !== 200) return false

  const data = await response.json()
  return data
}

export const useNewsPromotion = (promotionData: PromotionData): CardData[] | false => {
  const router = useRouter()
  const lang = getNameFromLocale(router.locale)

  const { content } = promotionData
  const type = content?.type

  const args = {
    type,
    tags: content?.tags,
    countryTags: content?.countryTags,
    localNewsTags: content?.localNewsTags,
    lang,
  }

  const key = type && type === 'promoteNews' ? args : null
  const { data } = useSWR(key, getNewsData)

  return data || false
}
