import {ClientConfig, createClient} from 'next-sanity'
import { apiVersion, dataset, projectId } from '../lib/api'

const sanityConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  perspective: 'published'
}

export const noCdnClient = (token: string) =>
  createClient({
    ...sanityConfig,
    useCdn:false,
    token
  });