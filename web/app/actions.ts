'use server'

import type { SyncTag } from '@sanity/client'
import { refresh, updateTag } from 'next/cache'
import { draftMode } from 'next/headers'

export async function disableDraftMode() {
  'use server'
  await Promise.allSettled([
    (await draftMode()).disable(),
    // Simulate a delay to show the loading state
    new Promise(resolve => setTimeout(resolve, 1000)),
  ])
}

export async function updateTags(tags: SyncTag[]) {
  for (const tag of tags) {
    updateTag(tag)
  }
  console.log(`<SanityLive /> updated tags: ${tags.join(', ')}`)
}

export async function liveRefresh() {
  refresh()
}
