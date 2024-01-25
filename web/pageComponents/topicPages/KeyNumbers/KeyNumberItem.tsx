import { Text } from '@components/Text'
import { KeyNumberItemData } from '../../../types'
import styled from 'styled-components'

const NumberText = styled(Text)`
  display: inline;
  font-weight: var(--fontWeight-medium);
`
const Wrapper = styled.div<{ $isScrollable: boolean }>`
  min-width: var(--card-maxWidth);
  ${({ $isScrollable }) => $isScrollable && { padding: '0 0 0 var(--space-medium)' }};
`

type KeyNumberItemProps = KeyNumberItemData & { isScrollable?: boolean }
export default function ({ keyNumber, description, unit, isScrollable = false }: KeyNumberItemProps) {
  return (
    <Wrapper $isScrollable={isScrollable}>
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
