import { useMemo } from 'react'
import { LiveQueryProvider } from 'next-sanity/preview'
import { getClient } from '../lib/sanity.server'

export default function PreviewProvider({
  children,
  draftMode = false,
}: {
  children: React.ReactNode
  draftMode: boolean
}) {
  const client = useMemo(() => getClient(draftMode ? true : false), [draftMode])
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>
}
