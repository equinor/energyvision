import { BaseSchemaDefinition } from 'sanity'
import { shouldShowFieldBasedOnRole } from './fieldVisibility'
import { SchemaReadOnlyRule } from './schemaReadOnlyRules'

export const withConditionalVisibility = (
  schemaDefinition: BaseSchemaDefinition,
  schemaReadOnlyRules: SchemaReadOnlyRule = {},
) => {
  const roles = schemaReadOnlyRules[schemaDefinition.name]
  if (roles)
    return {
      ...schemaDefinition,
      readOnly: ({ currentUser }: any) => !shouldShowFieldBasedOnRole(currentUser?.roles ?? [], roles),
    }
  else return schemaDefinition
}
