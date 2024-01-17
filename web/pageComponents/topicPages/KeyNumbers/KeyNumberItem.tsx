import { Text } from '@components/Text'
import { KeyNumberItemData } from '../../../types'
import styled from 'styled-components'

const NumberText = styled(Text)`
  display: inline;
  font-weight: var(--fontWeight-medium);
`
const Wrapper = styled.div`
  min-width: var(--card-maxWidth);
  flex-basis: 100%;
  @media (min-width: 750px) {
    flex-basis: 45%;
  }
  @media (min-width: 1200px) {
    flex-basis: 30%;
  }
`
export default function ({ keyNumber, description, unit }: KeyNumberItemData) {
  return (
    <Wrapper>
      <>
        <NumberText style={{ fontWeight: 'var(--fontWeight-medium)', fontSize: 'var(--typeScale-6)' }}>
          {keyNumber?.toLocaleString()}{' '}
        </NumberText>
        {unit && (
          <NumberText style={{ fontWeight: 'var(--fontWeight-medium)', fontSize: 'var(--typeScale-4)' }}>
            {unit}
          </NumberText>
        )}
      </>
      {description && (
        <Text size="md" style={{ marginTop: '0' }}>
          {description}
        </Text>
      )}
    </Wrapper>
  )
}
