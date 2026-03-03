'use server'

import type { SyncTag } from '@sanity/client'
import { refresh, updateTag } from 'next/cache'

export async function updateTags(tags: SyncTag[]) {
  for (const tag of tags) {
    updateTag(tag)
  }
  console.log(`<SanityLive /> updated tags: ${tags.join(', ')}`)
}

export async function liveRefresh() {
  refresh()
}
