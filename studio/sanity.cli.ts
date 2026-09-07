// Need to deploy using CLI
import { defineCliConfig } from 'sanity/cli';
import svgr from 'vite-plugin-svgr';

import { dataset, projectId } from './sanity.client';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: process.env.SANITY_STUDIO_APP_ID,
    autoUpdates: true,
  },
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      tsconfigPaths: true,
      alias: {
        ...viteConfig.resolve?.alias,
        '@': __dirname,
      },
    },
    plugins: [...(viteConfig.plugins ?? []), svgr()],
  }),
});
