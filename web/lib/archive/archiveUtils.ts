export const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

export const isArchivePage = (currentPagePath: string): boolean => {
  return currentPagePath.includes('/archive') || currentPagePath.includes('/what-we-do')
}
