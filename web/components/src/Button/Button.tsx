import styled from 'styled-components'

const StyledButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  color: #36454f;
  background-color: var(--bgColor);
  padding: 1rem;
`

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({ primary = false, label, ...props }) => {
  const backgroundColor = primary ? 'var(--bg-litchen-green)' : 'var(--bg-spruce-wood)'
  return (
    <StyledButton
      type="button"
      /*       className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
       */
      style={
        {
          '--bgColor': backgroundColor,
        } as React.CSSProperties
      }
      {...props}
    >
      {label}
    </StyledButton>
  )
}
