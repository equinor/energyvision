// Need to deploy using CLI
import { defineCliConfig } from 'sanity/cli'
import tsconfigPaths from 'vite-tsconfig-paths'
import { dataset, projectId } from './sanity.client'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  vite: {
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
    plugins: [tsconfigPaths()],
  },
})
