export const plainTextExcludingStrikeThrough = (blockTextField: string) => {
  return /* groq */ `
  pt::text(${blockTextField}[]{
        ...,
          children[!("s" in marks)]
        })`
}
