import { visionTool } from '@sanity/vision'
import { ConfigContext, createAuthStore, defineConfig, SchemaTypeDefinition } from 'sanity'
import { muxInput } from 'sanity-plugin-mux-input'
import { deskTool, StructureBuilder } from 'sanity/desk'
import deskStructure from './deskStructure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Equinor',

  projectId: 'h61q9gi9',
  dataset: 'global-development',

  plugins: [deskTool({ structure: (S: StructureBuilder, context: ConfigContext) => {
    return deskStructure(S, context)
  }, name: 'desk', title: 'Desk' }), visionTool(), muxInput()],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },

  auth: createAuthStore({
    projectId: 'h61q9gi9',
    dataset: 'global-development',
    mode: 'replace',
    redirectOnSingle: true,
    providers: [
      {
        name: 'saml',
        title: 'Equinor SSO',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/55ba173c',
        logo: '/static/favicon.ico',
      },
    ],
  }),
})
