import { CheckmarkCircleIcon } from '@sanity/icons'
import { useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({
  apiVersion: '2021-05-19',
  projectId: import.meta.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
  token: import.meta.env.SANITY_STUDIO_MUTATION_TOKEN,
})

const token = {
  _id: 'secrets.CrossDatasetDuplicator',
  _type: 'pluginSecrets',
  secrets: {
    bearerToken: import.meta.env.SANITY_STUDIO_MUTATION_TOKEN,
  },
}

export const ResetCrossDatasetToken = () => {
  const [reseting, setReseting] = useState(false)

  const onHandle = async () => {
    setReseting(true)
    await client.createOrReplace(token).finally(() => setReseting(false))
  }

  return {
    disabled: reseting,
    label: reseting ? 'Reseting token...' : 'Reset Cross Dataset Token',
    icon: CheckmarkCircleIcon,
    onHandle: onHandle,
  }
}
