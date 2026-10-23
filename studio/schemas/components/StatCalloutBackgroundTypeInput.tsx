import { Flex, Radio, Text } from '@sanity/ui';
import { useCallback, useId } from 'react';
import {
  type ObjectInputProps,
  PatchEvent,
  type RenderInputCallback,
  set,
  unset,
} from 'sanity';

type BackgroundType = 'image' | 'video' | 'color';

type StatCalloutBackgroundFields = {
  backgroundType?: BackgroundType;
  backgroundImage?: { asset?: { _ref?: string } };
  backgroundVideo?: { _ref?: string };
  backgroundColor?: { key?: string };
};

const backgroundTypes: { title: string; value: BackgroundType }[] = [
  { title: 'Image', value: 'image' },
  { title: 'Video', value: 'video' },
  { title: 'Color', value: 'color' },
];

export const StatCalloutBackgroundTypeInput = (
  props: ObjectInputProps<StatCalloutBackgroundFields>,
) => {
  const { onChange, path, readOnly, renderDefault, renderInput, value } = props;
  const id = useId();

  const selectedType =
    value?.backgroundType ??
    (value?.backgroundVideo?._ref
      ? 'video'
      : value?.backgroundImage?.asset?._ref
        ? 'image'
        : 'color');

  const handleChange = useCallback(
    (nextType: BackgroundType) => {
      if (nextType === selectedType) return;

      onChange(
        PatchEvent.from([
          set(nextType, ['backgroundType']),
          unset(['backgroundImage']),
          unset(['backgroundVideo']),
          unset(['backgroundColor']),
        ]),
      );
    },
    [onChange, selectedType],
  );

  const renderBackgroundInput = useCallback<RenderInputCallback>(
    (inputProps) => {
      if (
        inputProps.path.length !== path.length + 1 ||
        inputProps.path[path.length] !== 'backgroundType'
      ) {
        return renderInput(inputProps);
      }

      return (
        <Flex style={{ gap: '1rem' }}>
          {backgroundTypes.map((option) => {
            const optionId = `${id}-${option.value}`;

            return (
              <Flex key={option.value} align="center" style={{ gap: '0.5rem' }}>
                <Radio
                  checked={selectedType === option.value}
                  disabled={readOnly || inputProps.readOnly}
                  id={optionId}
                  name={id}
                  onChange={() => handleChange(option.value)}
                  value={option.value}
                />
                <Text>
                  <label htmlFor={optionId}>{option.title}</label>
                </Text>
              </Flex>
            );
          })}
        </Flex>
      );
    },
    [handleChange, id, path, readOnly, renderInput, selectedType],
  );

  return renderDefault({ ...props, renderInput: renderBackgroundInput });
};
