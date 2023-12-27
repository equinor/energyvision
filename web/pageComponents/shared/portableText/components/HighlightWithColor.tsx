interface HighlightColor {
  _type: 'highlightWithColor'
  color: {
    _type: 'colorList'
    title: string
    value: string
  }
}

const getColorByTitle = (title: string) => {
  switch (title) {
    case 'Red':
      return 'var(--red-text)'

    case 'Mid Yellow':
      return 'var(--mid-yellow)'

    case 'Mid Orange':
      return 'var(--mid-orange)'
  }
}
export const HighlightWithColor = ({ value, children }: { value: HighlightColor; children?: React.ReactNode }) => {
  return <span style={{ color: getColorByTitle(value.color.title) }}>{children}</span>
}
