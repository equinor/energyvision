import type { PortableTextBlock } from 'sanity'

export const validateCharCounterEditor = (value: PortableTextBlock[], charLimit: number, allowZeroLength = false) => {
  if (!value || (value.length === 0 && !allowZeroLength)) {
    return allowZeroLength ? true : 'Required'
  }

  const count = value[0]?.children
    ? (value[0].children as { text: string }[]).reduce(
        (total: number, current: { text: string }) => total + current.text.length,
        0,
      )
    : null

  if (count !== null && count > charLimit) {
    return `The introduction should be no longer than ${charLimit} characters. Currently ${count} characters long.`
  }

  return true
}
