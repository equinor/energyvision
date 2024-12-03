import { DocumentDefinition, FieldDefinition } from 'sanity'
import { shouldShowFieldBasedOnRole } from './fieldVisibility'
import { FieldVisibilityRule } from './fieldVisibilityRules'

export const withConditionalVisibility = (
  schemaDefinition: DocumentDefinition,
  visibilityRules: FieldVisibilityRule = {},
) => {
  const { fields } = schemaDefinition
  return {
    ...schemaDefinition,
    fields: fields.map((field: FieldDefinition) => {
      const roles = visibilityRules[field.name]

      // Apply visibility logic only if roles are specified for the field
      if (roles) {
        return {
          ...field,
          readOnly: ({ currentUser }) => !shouldShowFieldBasedOnRole(currentUser?.roles ?? [], roles),
        }
      }
      return field
    }),
  }
}
