/* eslint-disable @typescript-eslint/ban-ts-comment */
import { languages } from '../../languages'
import countries from '../../icons/countries'
import { Label, Inline, Badge } from '@sanity/ui'

function Flag({ lang }: any) {
  //@ts-ignore
  const Flag = countries[lang]
  return <Flag width={25} height={20} />
}

export default function LangInput({ value }: any) {
  const language = languages.filter((it) => it.name === value).at(0)
  return language ? (
    <Inline space={2}>
      <Flag lang={language.id} />
      <Label size={4}>{language?.title}</Label>
    </Inline>
  ) : (
    <Badge value="Language not set" />
  )
}
