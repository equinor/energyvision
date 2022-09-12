import { AnchorHTMLAttributes, forwardRef, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from '@components'

export type MagazineTagBarProps = {
  tags: TagLink[]
} & AnchorHTMLAttributes<HTMLAnchorElement>

export type TagLink = {
  label: string
  link: string
}
const StyledLink = styled(Link)`
  position: relative;
  &:hover {
    font-weight: bold !important;
  }

  &:after {
    content: '';
    position: absolute;
    border-left: 2px solid var(--energy-red-100);
    right: calc(var(--space-xLarge) * -0.5);
    height: 100%;
  }

  &:nth-child(3n):after {
    display: none;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: auto auto;
  border: 1px solid var(--slate-blue-70);
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }
`

const StyledForm = styled.form`
  display: none;
  @media (min-width: 1000px) {
    display: block;
  }
`
const TagWrapper = styled.div`
  margin: var(--space-medium) var(--space-xLarge) var(--space-medium) auto;
  display: grid;
  padding-left: var(--space-3xLarge);
  grid-gap: var(--space-xLarge);
  @media (max-width: 750px) {
    grid-template-columns: repeat(3, max-content);
    padding-left: 0px;
    margin: var(--space-medium) auto var(--space-medium) auto;
  }
  grid-template-columns: repeat(6, fit-content(100%));
`
const Input = styled.input`
  border: none !important;
  border-left: 1px solid var(--slate-blue-70) !important;
  padding: var(--space-medium) var(--space-3xLarge) var(--space-medium) var(--space-xLarge);
  width: 100%;
  background: transparent
    url("data:image/svg+xml,%3Csvg height='24px' width='24px' fill='%238C8C8C' viewBox='0 0 24 24' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath data-testid='eds-icon-path' d='M14.966 14.255h.79l4.99 5-1.49 1.49-5-4.99v-.79l-.27-.28a6.471 6.471 0 0 1-4.23 1.57 6.5 6.5 0 1 1 6.5-6.5c0 1.61-.59 3.09-1.57 4.23l.28.27zm-9.71-4.5c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5-4.5 2.01-4.5 4.5z' height='24' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")
    no-repeat var(--space-small) center;
  &[type='search']::placeholder {
    color: var(--grey-50);
  }

  &:focus {
    outline: none;
    box-shadow: 0;
  }
  &:focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background: transparent
      url("data:image/svg+xml,%0A%3Csvg width='32' height='32' stroke='%238C8C8C' viewBox='0 0 32 32'  xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4304_84678' x1='18' y1='0' x2='18' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_4304_84678' x1='18.0003' y1='0' x2='18.0003' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")
      no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }
`

export const MagazineTagBar = forwardRef<HTMLDivElement, MagazineTagBarProps>(function MagazineTagBar({ tags }, ref) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }
  function handleReset(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    setInputValue('')

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <Wrapper ref={ref}>
      <TagWrapper>
        <StyledLink underline={false} href={tags[0].link}>
          {tags[0].label}
        </StyledLink>
        <StyledLink underline={false} href={tags[1].link}>
          {tags[1].label}
        </StyledLink>
        <StyledLink underline={false} href={tags[1].link}>
          {tags[2].label}
        </StyledLink>
        <StyledLink underline={false} href={tags[1].link}>
          {tags[3].label}
        </StyledLink>
        <StyledLink underline={false} href={tags[1].link}>
          {tags[4].label}
        </StyledLink>
        <StyledLink underline={false} href={tags[1].link}>
          {tags[5].label}
        </StyledLink>
      </TagWrapper>
      <StyledForm action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          id="site-search"
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={'Search'}
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
      </StyledForm>
    </Wrapper>
  )
})
