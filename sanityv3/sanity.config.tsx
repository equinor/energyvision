import { visionTool } from '@sanity/vision'

import {
  ConfigContext,
  createAuthStore,
  defineConfig,
  DocumentActionComponent,
  PluginOptions,
  SchemaTypeDefinition,
  Template,
} from 'sanity'
import type { InputProps, ArrayOfObjectsInputProps, SchemaType, ArraySchemaType } from 'sanity'
import { scheduledPublishing } from '@sanity/scheduled-publishing'

import { deskTool, StructureBuilder } from 'sanity/desk'
import deskStructure, { defaultDocumentNodeResolver } from './deskStructure'
import { schemaTypes } from './schemas'
import { initialValueTemplates } from './initialValueTemplates'
import { CharCounterEditor } from './schemas/components/CharCounterEditor'
import { ReferenceBehavior, withDocumentI18nPlugin } from '@sanity/document-internationalization'
import { FotowareAssetSource } from './plugins/asset-source-fotoware'
import { BrandmasterAssetSource } from './plugins/asset-source-brandmaster'
import { createConfirmDialogAction } from './actions/ConfirmDialogAction'
import { dataset, projectId } from './sanity.client'
import { DatabaseIcon } from '@sanity/icons'
import { crossDatasetDuplicator } from '@sanity/cross-dataset-duplicator'
import { i18n } from './schemas/documentTranslation'
import { ResetCrossDatasetToken } from './actions/ResetCrossDatasetToken'

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

const getConfig = (datasetParam: string, projectIdParam: string, isSecret: boolean = false) => ({
  name: 'equinor-' + datasetParam,
  title: 'Equinor [' + datasetParam + ']',
  icon: DatabaseIcon,
  basePath: '/' + datasetParam,
  projectId: projectIdParam,
  dataset: datasetParam,
  form: {
    components: {
      input: handleInputComponents,
    },
  },
  plugins: withDocumentI18nPlugin(
    [
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
      FotowareAssetSource(),
      BrandmasterAssetSource(),
      isSecret &&
        crossDatasetDuplicator({
          tool: true,
          types: ['news', 'tag', 'countryTag'],
        }),
    ].filter((e) => e) as PluginOptions[],
    {
      includeDeskTool: false,
      referenceBehavior: ReferenceBehavior.WEAK,
      ...i18n,
      // referenceBehavior: ReferenceBehavior.WEAK,
    },
  ),

  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
    templates: (prev: Template<any, any>[]) => [...prev, ...initialValueTemplates],
  },
  document: {
    actions: (prev: DocumentActionComponent[], context: any) => {
      if (isSecret) prev.push(ResetCrossDatasetToken)
      return prev
        .filter(({ action, name }: any) => {
          return !(name !== 'DuplicateAction' && action === 'duplicate') // two actions are named duplicate, so we filter on two values to get the correct one
        })
        .map((originalAction) =>
          originalAction.action === 'publish' && context.schemaType === 'news'
            ? createConfirmDialogAction(originalAction)
            : originalAction,
        )
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
