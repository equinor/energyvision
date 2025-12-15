'use client'
import { type PropsWithChildren, useEffect } from 'react'
import { type HeaderData, usePage } from '@/contexts/pageContext'

export function PageWrapper({
  headerData,
  children,
}: PropsWithChildren<{ headerData: HeaderData }>) {
  const { updateHeaderData } = usePage()

  useEffect(() => {
    if (headerData) {
      updateHeaderData(headerData)
    }
  }, [headerData, updateHeaderData]) // Add dependencies if needed

  return children
}
