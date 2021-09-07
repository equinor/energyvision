export const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

export const isArchivePage = (currentPagePath: string): boolean => {
  return archivePaths.some((path) => currentPagePath.includes(path))
}

const archivePaths = ['/archive', '/what-we-do', '/sustainability']
