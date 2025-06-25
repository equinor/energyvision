import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import {
  ConfigContext,
  createAuthStore,
  defineConfig,
  DocumentActionComponent,
  PluginOptions,
  SchemaTypeDefinition,
  Template,
  buildLegacyTheme,
} from 'sanity'

import type {
  InputProps,
  ArrayOfObjectsInputProps,
  SchemaType,
  ArraySchemaType,
  DocumentBadgeComponent,
  DocumentFieldAction,
} from 'sanity'
import { structureTool } from 'sanity/structure'
import deskStructure, { defaultDocumentNodeResolver } from './deskStructure'
import { schemaTypes } from './schemas'
import { initialValueTemplates } from './initialValueTemplates'
import { CharCounterEditor } from './schemas/components/CharCounterEditor'
import { DeleteTranslationAction } from './actions/customDelete/DeleteTranslationAction'
import { documentInternationalization } from '@sanity/document-internationalization'
import { FotowareAssetSource } from './plugins/asset-source-fotoware'
import { BrandmasterAssetSource } from './plugins/asset-source-brandmaster'
import { SetAndPublishAction } from './actions/CustomPublishAction'
import { dataset, projectId } from './sanity.client'
import { DatabaseIcon } from '@sanity/icons'
import { crossDatasetDuplicator } from '@sanity/cross-dataset-duplicator'
import { i18n } from './schemas/documentTranslation'
import { ResetCrossDatasetToken } from './actions/ResetCrossDatasetToken'
import { getMetaTitleSuffix } from '../satellitesConfig'
import { defaultLanguage } from './languages'
import { createCustomDuplicateAction } from './actions/CustomDuplicateAction'
import { LangBadge } from './schemas/components/LangBadge'
import './customStyles.css'
import { partialStudioTheme } from './studioTheme'
import { copyAction } from './actions/fieldActions/CustomCopyFieldAction'
import CustomDocumentInternationalizationMenu from './schemas/components/CustomDocumentInternationalizationMenu'
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation'
import { locations } from './presentation/locations'
import { getLocaleFromName } from './src/lib/localization'

export const customTheme = buildLegacyTheme(partialStudioTheme)

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// @TODO:
// isArrayOfBlocksSchemaType helper function from Sanity is listed as @internal
// refactor to use that once stable
const isArraySchemaType = (schema: SchemaType): schema is ArraySchemaType => schema.name === 'array'
const isPortableTextEditor = (schema: SchemaType) => {
  if (!isArraySchemaType(schema)) return false

  return schema?.of && Array.isArray(schema.of) && schema.of[0]?.name === 'block'
}

// create the singleton docs before adding here...
const singletonTemplates = ['route_homepage', 'newsroom', 'pageNotFound', 'internalServerError', 'magazineIndex']

const handleInputComponents = (inputProps: InputProps) => {
  if (isPortableTextEditor(inputProps.schemaType))
    return <CharCounterEditor {...(inputProps as ArrayOfObjectsInputProps)} />

  return inputProps.renderDefault(inputProps)
}

const getStudioTitle = (dataset: string) => {
  switch (dataset) {
    case 'global-development':
      return 'Development'
    case 'secret':
      return 'Secret'
    case 'global-test':
      return 'Test'
    default:
      return getMetaTitleSuffix(dataset)
  }
}

const getConfig = (datasetParam: string, projectIdParam: string, isSecret = false) => ({
  name: 'equinor-' + datasetParam,
  title: 'Studio [' + getStudioTitle(datasetParam) + ']',
  icon: DatabaseIcon,
  basePath: '/' + datasetParam,
  projectId: projectIdParam,
  dataset: datasetParam,
  theme: customTheme,
  form: {
    components: {
      input: handleInputComponents,
    },
  },
  plugins: [
    documentInternationalization(i18n),
    structureTool({
      structure: (S, context: ConfigContext) => {
        return deskStructure(S, context)
      },
      defaultDocumentNode: defaultDocumentNodeResolver,
      name: 'desk',
      title: 'Desk',
    }),
    media(),
    datasetParam === 'global-development' && visionTool(),
    FotowareAssetSource(),
    BrandmasterAssetSource(),
    isSecret &&
      crossDatasetDuplicator({
        tool: true,
        types: ['news', 'tag', 'countryTag', 'translation.metadata'],
        follow: ['inbound'],
      }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        locations: {
          // Resolve locations using values from the matched document
          page: defineLocations({
            select: {
              title: 'title',
              lang: 'lang',
              //slugs: '_type match "route_*" && references(^._id)]',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/${getLocaleFromName(doc?.lang) !== 'en' ? `/${getLocaleFromName(doc?.lang)}` : ''}${
                    doc?.slugs?.[0]
                  }`,
                },
              ],
            }),
          }),
        },
      },
    }),
    /*       resolvers: {
        locations: locations,
      }, */
  ].filter((e) => e) as PluginOptions[],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
    templates: (prev: Template<any, any>[]) => [...filterTemplates(prev), ...initialValueTemplates],
  },
  document: {
    unstable_languageFilter: (prev: DocumentActionComponent[], ctx: any) => {
      const { schemaType, documentId } = ctx
      return schemaTypes.map((it) => it.name).includes(schemaType) && documentId
        ? [
            (props: any) => {
              return CustomDocumentInternationalizationMenu({ ...props, documentId })
            },
          ]
        : prev
    },
    actions: (prev: DocumentActionComponent[], context: any) => {
      // do not allow delete or duplicate action on singletons
      if (singletonTemplates.includes(context.schemaType))
        return prev.filter((it) => !['delete', 'duplicate'].includes(it.action))

      if (isSecret) prev.push(ResetCrossDatasetToken)
      if (i18n.schemaTypes.includes(context.schemaType)) prev.push(DeleteTranslationAction)
      return prev
        .filter(({ action }: DocumentActionComponent) => {
          return !(action === 'delete' && i18n.schemaTypes.includes(context.schemaType))
        })
        .map((originalAction) => {
          switch (originalAction.action) {
            case 'publish':
              return ['news', 'localNews'].includes(context.schemaType) ? SetAndPublishAction : originalAction
            case 'duplicate':
              return createCustomDuplicateAction(originalAction)
            default:
              return originalAction
          }
        })
    },
    unstable_comments: {
      enabled: false,
    },
    badges: (prev: DocumentBadgeComponent[], context: any) => {
      return i18n.schemaTypes.includes(context.schemaType) ? [LangBadge, ...prev] : prev
    },
    unstable_fieldActions: (previous: DocumentFieldAction[]) => {
      return previous.map((it) => (it.name === 'copyField' ? copyAction : it))
    },
    tasks: { enabled: false },
  },
  auth: createAuthStore({
    projectId: projectIdParam,
    dataset: datasetParam,
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

export default dataset === 'secret'
  ? defineConfig(
      [
        { dataset: 'secret', projectId: projectId },
        { dataset: 'global-development', projectId: 'h61q9gi9' },
        { dataset: 'global', projectId: 'h61q9gi9' },
      ].map((e) => getConfig(e.dataset, e.projectId, true)),
    )
  : getConfig(dataset, projectId)

const filterTemplates = (prev: Template<any, any>[]) => {
  const excludedTemplates = i18n.supportedLanguages
    .filter((lang) => lang.title != defaultLanguage.title)
    .flatMap((lang) => i18n.schemaTypes.map((type) => `${type}-${lang.id}`))
  return prev.filter(
    (template) =>
      !(
        i18n.schemaTypes.includes(template.id) ||
        excludedTemplates.includes(template.id) ||
        singletonTemplates.includes(template.id)
      ),
  )
}
