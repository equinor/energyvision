import { Flex, Radio, Text } from '@sanity/ui';
import type { ReactNode, SVGProps } from 'react';
import { RiMarkPenLine } from 'react-icons/ri';
import {
  type BlockAnnotationProps,
  defineField,
  defineType,
  type StringInputProps,
  set,
  useFormValue,
} from 'sanity';

const outlinePath =
  'M112,12 C96,2 54,7 29,16 C16.5,20.5 13,26 9,35 C5,44 5,53 11,62 C17,71 48,79 80,80 C113,81 147,75 151,62 C157,43 137,10 115,6 C103,3 91,5 82,6';

const HighlightOutlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    {...props}
    viewBox="0 0 160 90"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d={outlinePath}
      fill="none"
      stroke="#e63946"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

const highlightOptions = [
  { title: 'Outlined', value: 'outlined', icon: HighlightOutlineIcon },
  { title: 'Marker', value: 'marker', icon: RiMarkPenLine },
];

const HighlightText = ({
  isOutlined,
  children,
}: {
  isOutlined: boolean;
  children: ReactNode;
}) => {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: isOutlined ? 1.2 : undefined,
        padding: isOutlined ? '0.1em 0.15em 0.1em 0.3em' : '0 0.2em',
        backgroundColor: isOutlined ? undefined : '#FCFE7F',
        borderRadius: isOutlined ? undefined : '9px',
        color: isOutlined ? undefined : '#000000',
      }}
    >
      {isOutlined && (
        <span contentEditable={false} aria-hidden="true">
          <svg
            viewBox="0 0 160 90"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '115%',
              height: '120%',
              margin: 0,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            <path
              d={outlinePath}
              fill="none"
              stroke="#e63946"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      {children}
    </span>
  );
};

export const AdvancedHighlightInput = ({
  value = 'marker',
  onChange,
  readOnly,
  elementProps,
  path,
}: StringInputProps) => {
  const children = useFormValue([...path.slice(0, -3), 'children']);
  const annotationSegment = path[path.length - 2];
  const annotationKey =
    typeof annotationSegment === 'object' && '_key' in annotationSegment
      ? annotationSegment._key
      : undefined;
  const highlightedText = Array.isArray(children)
    ? children
        .filter(
          (span) =>
            span?._type === 'span' &&
            typeof span.text === 'string' &&
            Array.isArray(span.marks) &&
            span.marks.includes(annotationKey),
        )
        .map((span) => span.text)
        .join('')
    : '';

  return (
    <Flex direction="column" gap={3}>
      <Flex
        align="center"
        justify="flex-start"
        padding={2}
        style={{ minHeight: 48 }}
      >
        <Text size={3}>
          <HighlightText isOutlined={value === 'outlined'}>
            {highlightedText || 'Highlighted text'}
          </HighlightText>
        </Text>
      </Flex>
      <Text size={1} id={`${elementProps.id}-label`}>
        Choose type of highlighting
      </Text>
      <Flex
        gap={4}
        role="radiogroup"
        aria-labelledby={`${elementProps.id}-label`}
        id={elementProps.id}
      >
        {highlightOptions.map((option) => (
          <Flex key={option.value} as="label" align="center" gap={2}>
            <Radio
              name={elementProps.id}
              value={option.value}
              checked={value === option.value}
              disabled={readOnly}
              onFocus={elementProps.onFocus}
              onBlur={elementProps.onBlur}
              onChange={() => onChange(set(option.value))}
            />
            <Flex align="center" gap={2}>
              <option.icon />
              <Text size={1}>{option.title}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export const AdvancedHighlightAnnotation = (props: BlockAnnotationProps) =>
  props.renderDefault({
    ...props,
    textElement: (
      <HighlightText isOutlined={props.value.style === 'outlined'}>
        {props.textElement}
      </HighlightText>
    ),
  });

export const advancedHighlight = defineType({
  name: 'advancedHighlight',
  title: 'Brand highlighter',
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
      components: {
        input: AdvancedHighlightInput,
        field: (props) => props.renderDefault({ ...props, title: undefined }),
      },
      validation: (rule) => rule.required().valid(['outlined', 'marker']),
    }),
  ],
  components: { annotation: AdvancedHighlightAnnotation },
});
