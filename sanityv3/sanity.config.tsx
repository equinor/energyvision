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
} from 'sanity'

import type { InputProps, ArrayOfObjectsInputProps, SchemaType, ArraySchemaType, DocumentBadgeComponent } from 'sanity'
import { deskTool, StructureBuilder } from 'sanity/desk'
import deskStructure, { defaultDocumentNodeResolver } from './deskStructure'
import { schemaTypes } from './schemas'
import { initialValueTemplates } from './initialValueTemplates'
import { CharCounterEditor } from './schemas/components/CharCounterEditor'
import { DeleteTranslationAction } from './actions/customDelete/DeleteTranslationAction'
import { documentInternationalization } from '@equinor/document-internationalization'
import { FotowareAssetSource } from './plugins/asset-source-fotoware'
import { BrandmasterAssetSource } from './plugins/asset-source-brandmaster'
import { createCustomPublishAction } from './actions/CustomPublishAction'
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
import { buildLegacyTheme } from 'sanity'

export const customTheme = buildLegacyTheme(partialStudioTheme)

// @TODO:
// isArrayOfBlocksSchemaType helper function from Sanity is listed as @internal
// refactor to use that once stable
const isArraySchemaType = (schema: SchemaType): schema is ArraySchemaType => schema.name === 'array'
const isPortableTextEditor = (schema: SchemaType) => {
  if (!isArraySchemaType(schema)) return false

  return schema?.of && Array.isArray(schema.of) && schema.of[0]?.name === 'block'
}

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
    deskTool({
      structure: (S: StructureBuilder, context: ConfigContext) => {
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
  ].filter((e) => e) as PluginOptions[],

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
    templates: (prev: Template<any, any>[]) => [...filterTemplates(prev), ...initialValueTemplates],
  },
  document: {
    actions: (prev: DocumentActionComponent[], context: any) => {
      if (isSecret) prev.push(ResetCrossDatasetToken)
      if (i18n.schemaTypes.includes(context.schemaType)) prev.push(DeleteTranslationAction)
      return prev
        .filter(({ action }: DocumentActionComponent) => {
          return !(action === 'delete' && i18n.schemaTypes.includes(context.schemaType))
        })
        .map((originalAction) => {
          switch (originalAction.action) {
            case 'publish':
              return createCustomPublishAction(originalAction, context)
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
  return prev.filter((template) => !(i18n.schemaTypes.includes(template.id) || excludedTemplates.includes(template.id)))
}
