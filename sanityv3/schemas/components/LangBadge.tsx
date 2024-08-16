/* eslint-disable @typescript-eslint/ban-ts-comment */
import { languages } from '../../languages'
import countries from '../../icons/countries'

function Flag({ lang }: any) {
  //@ts-ignore
  const Flag = countries[lang]
  return <Flag width={20} height={15} />
}

export function LangBadge(props: any) {
  const lang = props.published?.lang || props.draft?.lang
  const language = languages.filter((it) => it.name === lang).at(0)

  return language
    ? {
        label: <Flag lang={language.id} />,
        title: language.title,
        color: 'normal',
      }
    : {
        label: 'Language not set',
        title: '',
        color: 'warning',
      }
}
