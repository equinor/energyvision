export const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

// @TODO: deprecated for the time being, revisit later on
export const isArchivePage = (currentPagePath: string): boolean => {
  return archivePaths.some((path) => currentPagePath.includes(path))
}

const archivePaths = [
  '/archive',
  '/about-us',
  '/careers',
  '/investors',
  '/stories',
  '/suppliers',
  '/sustainability',
  '/what-we-do',
  '/where-we-are',
  '/how-and-why',
]
