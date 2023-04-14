import type { ObjectMember, FieldMember } from 'sanity'

export const getMemberField = (members: ObjectMember[], field: string) =>
  members.find((member): member is FieldMember => member.kind === 'field' && member.name === field)
