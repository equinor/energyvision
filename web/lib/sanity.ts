// eslint-disable-next-line import/no-unresolved
import { definePreview } from 'next-sanity/preview'
import { sanityConfig } from './config'

const { dataset, projectId } = sanityConfig

export const usePreview = definePreview({ projectId, dataset })
