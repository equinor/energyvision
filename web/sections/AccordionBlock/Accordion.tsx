import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { Accordion as EnvisAccordion } from '@components'
import type { AccordionListData } from '../../types/index'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import useRouterReplace from '../../pageComponents/hooks/useRouterReplace'

const { Item, Header, Panel } = EnvisAccordion

// Next.js uses ParsedUrlQuery under the hood
function getPreExpanded(query: ParsedUrlQuery, queryParamName: string) {
  let preExpanded: string[] = []
  if (query[queryParamName]) {
    if (Array.isArray(query[queryParamName])) {
      preExpanded = query[queryParamName] as string[]
    } else {
      preExpanded = [query[queryParamName]] as string[]
    }
  }
  const preExpandedAsNumbers = preExpanded
    .map((item: string) => parseInt(item, 10))
    //Because technically somebody could alter the url
    .filter((value: number | typeof NaN) => !Number.isNaN(value))

  return preExpandedAsNumbers
}

type AccordionProps = {
  hasTitle?: boolean
  data: AccordionListData[]
  queryParamName: string
  id: string
}

const Accordion = ({ data, id, hasTitle = true, queryParamName }: AccordionProps) => {
  const router = useRouter()
  const replaceUrl = useRouterReplace()
  // Query is an empty object initially https://nextjs.org/docs/routing/dynamic-routes#caveats
  const [indices, setIndices] = useState<number[]>([])

  useEffect(() => {
    if (!router.isReady) return
    setIndices(getPreExpanded(router.query, queryParamName))
  }, [router.isReady, router.query, queryParamName])

  function toggleItem(toggledIndex: number) {
    let expandedItems = []
    if (indices.includes(toggledIndex)) {
      expandedItems = indices.filter((currentIndex) => currentIndex !== toggledIndex)
    } else {
      expandedItems = [...indices, toggledIndex].sort()
    }
    replaceUrl({ [queryParamName]: expandedItems })
  }

  return (
    <EnvisAccordion index={indices} onChange={toggleItem} id={id}>
      {data.map((item, idx) => {
        const { id, title: itemTitle, content } = item

        return (
          <Item key={id} id={idx}>
            <Header headingLevel={hasTitle ? 'h3' : 'h2'}>{itemTitle}</Header>
            <Panel>{content && <Blocks value={content} />}</Panel>
          </Item>
        )
      })}
    </EnvisAccordion>
  )
}

export default Accordion
