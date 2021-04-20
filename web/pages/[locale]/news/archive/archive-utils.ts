import * as fs from 'fs';

export type OldArchiveNewsPageInfo = {
  params: {
    locale: string,
    pagePath: string[]
  }
};

export type Old2016To2018ArchiveNewsPageInfo = {
  params: {
    locale: string,
    pageName: string
  }
};

export type pageResponseData = {
  title: string,
  description: string,
  content: string
}

export const archiveServerHostname = 'http://localhost:8080'
export const news2016To2018File = 'news2016To2018.txt'
export const oldArchiveNewsFile = 'oldArchiveNews.txt'

export const get2016To2018NewsStaticPaths = ():Old2016To2018ArchiveNewsPageInfo[] => {
  const params:Old2016To2018ArchiveNewsPageInfo[] = []
  const newsPagesList = getNewsPaths(news2016To2018File)
  newsPagesList.map(pagePath => {
    const languageCode = pagePath.substr(1, 2)
    const pageName = removeHTMLExtension(pagePath.substr(pagePath.lastIndexOf("/") + 1))
    const pageInfo:Old2016To2018ArchiveNewsPageInfo = {'params': {'locale': languageCode, 'pageName': pageName}}
    params.push(pageInfo)
  })
  return params
}


export const getOldArchivedNewsStaticPaths = (): OldArchiveNewsPageInfo[] => {
  const params: OldArchiveNewsPageInfo[] = []
  const newsPagesList = getNewsPaths(oldArchiveNewsFile)
  newsPagesList.map(pagePath => {
    const languageCode = pagePath.substr(1, 2)
    const pageName = removeHTMLExtension(pagePath.substr(pagePath.indexOf("/", 9) + 1)).split("/")
    const pageInfo: OldArchiveNewsPageInfo = {
      'params': {
        'locale': languageCode,
        'pagePath': pageName
      }
    }
    params.push(pageInfo)
  })
  return params
}

export const getArchivedNewsList = (locale: string): string[] => {
  return getNewsPaths("news2016To2018.txt").filter(pagePath => pagePath.startsWith(`/${locale}`))
    .map(pagePath => sanitizeNewsURL(pagePath))
}

export const getSupportedLocalesAsStaticPathParams = () => {
  return [
    {
      params: {
        locale: 'en'
      }
    },
    {
      params: {
        locale: 'no'
      }
    }
  ]
}

const sanitizeNewsURL = (pagePath: string): string => {
  const languageCode = pagePath.substr(0, 3)
  const restOfThePage = pagePath.substr(pagePath.lastIndexOf("/"))
  return languageCode + "/news/archive" + removeHTMLExtension(restOfThePage)
}

const getNewsPaths = (fileName: string): Array<string> => {
  return fs.readFileSync(process.cwd() + `\\pages\\[locale]\\news\\archive\\resources\\${fileName}`)
    .toString()
    .replace(/\r/g, "")
    .split(/\n/)
}

const removeHTMLExtension = (path: string): string => {
  return path.replace(".html", "")
}

