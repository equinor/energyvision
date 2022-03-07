import { ChangeEvent, FormEvent, RefObject, ComponentProps } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import VisuallyHidden from '../shared/VisuallyHidden'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const Input = styled.input`
  background-color: var(--slate-blue-95);
  border: 1px solid var(--moss-green-50);
  padding: var(--space-medium) var(--space-medium) var(--space-medium) var(--space-xxLarge);
  width: 100%;
  color: var(--white-100);
  /* Assuming this is not a real button */
  background: transparent
    url("data:image/svg+xml,%3Csvg height='24px' width='24px' fill='white' viewBox='0 0 24 24' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath data-testid='eds-icon-path' d='M14.966 14.255h.79l4.99 5-1.49 1.49-5-4.99v-.79l-.27-.28a6.471 6.471 0 0 1-4.23 1.57 6.5 6.5 0 1 1 6.5-6.5c0 1.61-.59 3.09-1.57 4.23l.28.27zm-9.71-4.5c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5-4.5 2.01-4.5 4.5z' height='24' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")
    no-repeat var(--space-small) center;

  &[type='search']::placeholder {
    color: var(--grey-40);
  }

  /* So, according to the spec, text input will always have focus no matter which device */
  /*  &:focus-visible {
    ${outlineTemplate(outline)}
    outline-color: var(--energy-red-90);
  } */
  /* /* Is the blinking cursor enough */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--white-100);
  }

  &:focus::-webkit-search-cancel-button {
    opacity: 0.8;
    pointer-events: all;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background: url("data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)' stroke='url(%23paint0_linear_4304_84678)' stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)' stroke='url(%23paint1_linear_4304_84678)' stroke-width='2.5' stroke-linecap='round'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4304_84678' x1='18' y1='0' x2='18' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_4304_84678' x1='18.0003' y1='0' x2='18.0003' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")
      no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }
`

export type ControlledSearchBoxProps = ComponentProps<'div'> & {
  inputRef: RefObject<HTMLInputElement>
  onChange(event: ChangeEvent): void
  onReset(event: FormEvent): void
  onSubmit?(event: FormEvent): void
  value: string
}

const ControlledSearchBox = ({
  inputRef,

  onChange,
  onReset,
  onSubmit,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const intl = useIntl()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  function handleReset(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const search = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <div {...props}>
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <VisuallyHidden as="label" htmlFor="site-search">
          {search}
        </VisuallyHidden>
        <Input
          id="site-search"
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={search}
          spellCheck={false}
          maxLength={512}
          type="search"
          value={value}
          onChange={onChange}
          /*      onInput={handleReset} */
        />
      </form>
    </div>
  )
}

export default ControlledSearchBox
