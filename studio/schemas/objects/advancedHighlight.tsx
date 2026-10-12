import { Button, Flex } from '@sanity/ui';
import { RiMarkPenLine, RiRectangleLine } from 'react-icons/ri';
import {
  type BlockAnnotationProps,
  defineField,
  defineType,
  type StringInputProps,
  set,
} from 'sanity';

const highlightOptions = [
  { title: 'Outlined', value: 'outlined', icon: RiRectangleLine },
  { title: 'Marker', value: 'marker', icon: RiMarkPenLine },
];

export const AdvancedHighlightInput = ({
  value = 'marker',
  onChange,
  readOnly,
  elementProps,
}: StringInputProps) => (
  <Flex gap={2} role="group" aria-label="Highlight style" id={elementProps.id}>
    {highlightOptions.map((option) => (
      <Button
        key={option.value}
        type="button"
        text={option.title}
        icon={option.icon}
        mode={value === option.value ? 'default' : 'ghost'}
        aria-pressed={value === option.value}
        disabled={readOnly}
        onClick={() => onChange(set(option.value))}
      />
    ))}
  </Flex>
);

export const AdvancedHighlightAnnotation = (props: BlockAnnotationProps) => {
  const isOutlined = props.value.style === 'outlined';

  return props.renderDefault({
    ...props,
    textElement: (
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          padding: '0 0.2em',
          backgroundColor: isOutlined ? undefined : '#FCFE7F',
          borderRadius: isOutlined ? undefined : '9px',
          color: isOutlined ? undefined : '#000000',
        }}
      >
        {isOutlined && (
          <div
            aria-hidden="true"
            contentEditable={false}
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid #FF1243',
              borderRadius: '9999px',
              pointerEvents: 'none',
            }}
          />
        )}
        {props.textElement}
      </span>
    ),
  });
};

export const advancedHighlight = defineType({
  name: 'advancedHighlight',
  title: 'Advanced highlight',
  type: 'object',
  icon: RiMarkPenLine,
  initialValue: { style: 'marker' },
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'marker',
      options: {
        list: highlightOptions.map(({ title, value }) => ({ title, value })),
      },
      components: { input: AdvancedHighlightInput },
      validation: (rule) => rule.required().valid(['outlined', 'marker']),
    }),
  ],
  components: { annotation: AdvancedHighlightAnnotation },
});
