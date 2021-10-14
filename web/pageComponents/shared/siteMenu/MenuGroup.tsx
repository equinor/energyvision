import styled from 'styled-components'
import NextLink from 'next/link'
import { BlockRenderer } from '../../../common/serializers'
import SimpleBlockContent from '../../../common/SimpleBlockContent'
import { Link, List, Heading, Menu } from '@components'
import type { MenuLinkData, SubMenuData, SubMenuGroupData } from '../../../types/types'
import { SubMenuGroup, SubMenuGroupHeading, SubMenuGroupList } from './SubMenuGroup'
import NewsCard from '../../news/NewsCard'

const { SubMenu, SubMenuHeader, SubMenuPanel, SubMenuGroups } = Menu
const { Item } = List

const TopLevelLink = styled(Link)`
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-large);
  @media (min-width: 1300px) {
    display: none;
  }
`

const StyledItem = styled(Item)`
  font-size: 0.9em;
  /* height: 48px; */
`

const StyledSubMenuGroupLink = styled(Link)`
  display: flex;
  padding: calc(var(--space-small) + var(--space-xSmall)) var(--space-xLarge);
  @media (min-width: 1300px) {
    /* padding: var(--space-small) 0 var(--space-small) 0; */
    padding: 0.45em 0;
  }
`

const IntroContainer = styled.div`
  margin-top: var(--space-medium);
`
const StyledSection = styled.section`
  display: none;
  max-width: 35rem;
  @media (min-width: 1300px) {
    display: block;
    padding-bottom: var(--space-3xLarge);
  }
`

const Grid = styled.div`
  @media (min-width: 1300px) {
    display: grid;
    grid-template-columns: 1fr min-content;
  }
`

const Promoted = styled.div`
  @media (min-width: 1300px) {
    width: 18rem;
    padding-left: var(--space-medium);
    margin-top: 35px;
    border-left: 1px solid var(--grey-30);
  }
`

function getLink(linkData: MenuLinkData) {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!linkData) return 'something-wrong'
  const { isStatic, link, staticUrl } = linkData
  if (isStatic) {
    return staticUrl || '/'
  } else {
    return (link && link.slug) || '/'
  }
}

export const MenuGroup = (topLevelItem: SubMenuData) => {
  const { topLevelLink, groups, intro, featuredContent } = topLevelItem

  const topLevelHref = getLink(topLevelLink)

  return (
    <SubMenu>
      <SubMenuHeader> {topLevelLink?.label}</SubMenuHeader>
      {/* @TODO: Should we allow external links at top level? */}
      <SubMenuPanel>
        <Grid>
          <div>
            {/* @TODO: Can we reuse the same link across devices */}
            <NextLink href={topLevelHref} passHref>
              <TopLevelLink underline={false}>{`${topLevelLink?.label} overview page`}</TopLevelLink>
            </NextLink>
            <StyledSection>
              <Heading level="h2" size="lg">
                {topLevelLink?.label}
              </Heading>

              {intro && (
                <IntroContainer>
                  <SimpleBlockContent
                    blocks={intro}
                    serializers={{
                      types: {
                        block: BlockRenderer,
                      },
                    }}
                  />
                </IntroContainer>
              )}

              {/* @TODO: What to do about this link? */}
              <NextLink href={topLevelHref} passHref>
                <Link variant="readMore">{topLevelLink?.label}</Link>
              </NextLink>
            </StyledSection>
            {groups && groups.length > 0 && (
              <SubMenuGroups>
                {groups.map((groupItem: SubMenuGroupData) => {
                  return (
                    <SubMenuGroup key={groupItem.id}>
                      {groupItem.label && (
                        <SubMenuGroupHeading level="h3" size="sm">
                          {groupItem.label}
                        </SubMenuGroupHeading>
                      )}
                      <SubMenuGroupList aria-label={groupItem.label || topLevelLink?.label} unstyled>
                        {groupItem.links.map((link: MenuLinkData) => (
                          <StyledItem key={link.id}>
                            <NextLink href={getLink(link)} passHref>
                              <StyledSubMenuGroupLink underline={false}>{link.label}</StyledSubMenuGroupLink>
                            </NextLink>
                          </StyledItem>
                        ))}
                      </SubMenuGroupList>
                    </SubMenuGroup>
                  )
                })}
              </SubMenuGroups>
            )}
          </div>
          {featuredContent && (
            <Promoted>
              <NewsCard data={featuredContent} fitToContent />
            </Promoted>
          )}
        </Grid>
      </SubMenuPanel>
    </SubMenu>
  )
}
