import { visionTool } from '@sanity/vision'
import { ConfigContext, createAuthStore, defineConfig, SchemaTypeDefinition } from 'sanity'
import { scheduledPublishing } from "@sanity/scheduled-publishing";
import { muxInput } from 'sanity-plugin-mux-input'
import { deskTool, StructureBuilder } from 'sanity/desk'
import deskStructure, { defaultDocumentNodeResolver } from './deskStructure'
import { schemaTypes } from './schemas'
import { initialValueTemplates } from './initialValueTemplates'

export default defineConfig({
  name: 'default',
  title: 'Equinor',

  projectId: 'h61q9gi9',
  dataset: 'global-development',

  plugins: [
    deskTool({
      structure: (S: StructureBuilder, context: ConfigContext) => {
        return deskStructure(S, context)
      },
      defaultDocumentNode: defaultDocumentNodeResolver,
      name: 'desk',
      title: 'Desk',
    }),
    visionTool(),
    scheduledPublishing(),
    muxInput(),
  ],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
    templates: (prev) => [...prev, ...initialValueTemplates],
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
