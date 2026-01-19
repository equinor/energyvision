import type { PortableTextInputProps } from 'sanity'
import styled from 'styled-components'

export const CompactBlockEditor = (props: PortableTextInputProps) => {
  // check if validations exist
  // @ts-ignore
  /*   const validationRules = schemaType.validation[0]._rules || []
  const characters = value ? toPlainText(value).length : 0 */
  //check if max Character validation exists and get the value
  /*   const max = validationRules
    .filter((rule: any) => rule.flag === 'max')
    .map((rule: any) => rule.constraint)[0] */

  return (
    <Container
      id={'PTE-height-container'}
      /*       style={{
        height: '100px',
      }} */
    >
      {props.renderDefault({
        ...props,
        // remove the need to activate the PTE
        initialActive: true,
      })}
    </Container>
  )
}
// add a specific height to the PTE without losing the ability to resize it
const Container = styled.div`
  [data-testid="pt-editor"][data-fullscreen="false"] {
    height: 100px;
  }
`
