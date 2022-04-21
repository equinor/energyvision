const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

// What is the dataset name for global production site
const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'

const LIVE_DOMAINS = ['equinor.pl', 'equinorstorage.de', 'equinor.com']

export const getDataset = () => dataset

export const isGlobal = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV

// Used to map to correct indices for search
export const isGlobalProduction = dataset === EQUINOR_COM_NAME
export const isGlobalDevelopment = dataset === EQUINOR_COM_DEV

export const hasNews = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV

export const hasLocalNews = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV

export const hasArchivedNews = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV

export const shouldIndexAndFollow = (domain: string) => {
  const sanitizedDomain = domain.replace('http://', '').replace('https://', '').replace('www.', '')
  return LIVE_DOMAINS.includes(sanitizedDomain)
}
