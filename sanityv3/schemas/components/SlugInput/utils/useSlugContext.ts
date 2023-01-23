import { useMemo } from 'react'
import { SlugSourceContext, useCurrentUser, useDataset, useProjectId, useSchema } from 'sanity'
import { sanityClient } from '../../../../sanity.client'

/**
 * @internal
 */
export type SlugContext = Omit<SlugSourceContext, 'parent' | 'parentPath'>

/**
 * @internal
 */
export function useSlugContext(): SlugContext {
  const getClient = () => sanityClient
  const schema = useSchema()
  const currentUser = useCurrentUser()
  const projectId = useProjectId()
  const dataset = useDataset()

  return useMemo(() => {
    return {
      projectId,
      dataset,
      getClient,
      schema,
      currentUser,
    } as any
  }, [getClient, schema, currentUser, projectId, dataset])
}
