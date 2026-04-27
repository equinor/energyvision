// Need to deploy using CLI
import { defineCliConfig } from 'sanity/cli'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

import { dataset, projectId } from './sanity.client'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: async viteConfig => {
    return {
      ...viteConfig,
      resolve: {
        alias: {
          '@': __dirname,
        },
      },
      //@ts-ignore : testing getting tailwind css
      plugins: [...viteConfig.plugins, tsconfigPaths(), svgr()],
    }
  },
})
