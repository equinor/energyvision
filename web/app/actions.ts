'use server';

import { refresh, updateTag } from 'next/cache';
import type { SyncTag } from 'next-sanity';

export async function updateTags(tags: SyncTag[]) {
  for (const tag of tags) {
    updateTag(tag);
  }
  console.log(`<SanityLive /> updated tags: ${tags.join(', ')}`);
}

export async function liveRefresh() {
  refresh();
}
