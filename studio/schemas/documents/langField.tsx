import { Badge, Card, Inline, Text } from '@sanity/ui'
import { defineField, type FieldProps, type InputProps } from 'sanity'
import { languages } from '@/languages'
import countries from '../../icons/countries'

const Flag = ({ lang }: any) => {
  //@ts-ignore
  const Flag = countries[lang]
  return (
    <div style={{ width: '15px', height: '11px', aspectRatio: '1.33' }}>
      <Flag width='100%' height='auto' />
    </div>
  )
}

export const lang = defineField({
  title: 'Language',
  // should match 'languageField' plugin configuration setting, if customized
  name: 'lang', // should match languageFiled value in i18n documentTranslation.js
  type: 'string',
  // readOnly: true, // donot make it read only.. as this will prevent lang field from writing..
  hidden: false,
  components: {
    field: (props: FieldProps) => {
      // biome-ignore lint/correctness/noUnusedVariables: to get rid of the sanity context menu
      const { title, description, ...restProps } = props
      return (
        <Card border padding={3}>
          {/**@ts-ignore */}
          {props.renderDefault(restProps)}
        </Card>
      )
    },
    input: (props: InputProps) => {
      const { value } = props
      const language = languages.filter(it => it.name === value).at(0)
      return language ? (
        <Inline space={1}>
          <Flag lang={language.id} />
          <Text style={{ paddingLeft: '4px' }} size={2}>
            {language?.title}
          </Text>
        </Inline>
      ) : (
        <Badge value='Language not set' />
      )
    },
  },
  validation: Rule =>
    Rule.required().error('Please select the language for this document'),
})
