const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

// What is the dataset name for global production site
const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'
const EQUINOR_COM_TEST = 'global-test'

export const getDataset = () => dataset

export const isGlobal = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV || dataset === EQUINOR_COM_TEST

// Used to map to correct indices for search
export const isGlobalProduction = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_TEST
export const isGlobalDevelopment = dataset === EQUINOR_COM_DEV

export const hasNews = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV || dataset === EQUINOR_COM_TEST

export const hasLocalNews = dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV || dataset === EQUINOR_COM_TEST

export const hasArchivedNews =
  dataset === EQUINOR_COM_NAME || dataset === EQUINOR_COM_DEV || dataset === EQUINOR_COM_TEST
