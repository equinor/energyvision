const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export const getDataset = () => dataset

export const isGlobal = dataset === 'production'

export const hasNews = dataset === 'production' || dataset === 'germany'

export const hasArchivedNews = dataset === 'production'
