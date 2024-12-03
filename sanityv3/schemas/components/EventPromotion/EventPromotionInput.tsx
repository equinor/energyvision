import { Text, Card, Grid, Stack, Heading, Radio, Inline, Flex, Switch } from '@sanity/ui'
import { set, MemberField } from 'sanity'
import { getObjectMemberField } from '../utils/getObjectMemberField'
import type { ObjectInputProps } from 'sanity'
import type { EventPromotion } from '../../objects/promotion/promoteEvents'
import { ReadOnlyWrapper } from '../common/ReadOnlyWrapper'

type EventPromotionInputProps = {
  value?: EventPromotion
} & ObjectInputProps

const InlinePreview = ({ value }: { value: EventPromotion | undefined }) => {
  if (!value) return null

  const time = value?.promotePastEvents ? 'past' : 'upcoming'
  const number = value?.promotePastEvents ? value?.pastEventsCount || '50 (max)' : ''
  const withTags = value?.useTags ? 'from selected tags' : ''
  const automaticPromotion = value?.promoteSingleUpcomingEvent
    ? 'Automatically promoting single upcoming event'
    : `Automatically promoting ${number} ${time} events ${withTags}`

  return (
    <Card padding={[4]} radius={2} shadow={1} tone="primary" marginTop={3} marginBottom={3}>
      <Text>{value?.manuallySelectEvents ? 'Manually promoting selected events' : automaticPromotion}</Text>
    </Card>
  )
}

export const EventPromotionInput = (props: EventPromotionInputProps) => {
  const { value, members, renderField, renderInput, renderItem, renderPreview, onChange, renderDefault, readOnly } =
    props

  const useTags = getObjectMemberField(members, 'useTags')
  const promotePastEvents = getObjectMemberField(members, 'promotePastEvents')
  const pastEventsCount = getObjectMemberField(members, 'pastEventsCount')
  const upcomingEventsCount = getObjectMemberField(members, 'upcomingEventsCount')
  const selectedTags = getObjectMemberField(members, 'tags')
  const promotedEvents = getObjectMemberField(members, 'promotedEvents')

  if (!promotePastEvents || !pastEventsCount || !upcomingEventsCount || !useTags || !selectedTags || !promotedEvents)
    return renderDefault(props)

  return (
    <ReadOnlyWrapper readOnly={readOnly}>
      <Stack space={4}>
        <Heading size={1}>How do you want to promote events?</Heading>
        <Flex>
          <Card padding={2} radius={2} shadow={1} marginRight={3}>
            <Inline space={2}>
              <Text as="label" htmlFor="selectModeAutomatic">
                Automatic
              </Text>
              <Radio
                checked={!value?.manuallySelectEvents}
                name="selectMode"
                id="selectModeAutomatic"
                onChange={() => onChange(set(false, ['manuallySelectEvents']))}
                value="a"
              ></Radio>
            </Inline>
          </Card>
          <Card padding={2} radius={2} shadow={1}>
            <Inline space={2}>
              <Text as="label" htmlFor="selectModeManual">
                Manual
              </Text>
              <Radio
                checked={value?.manuallySelectEvents}
                name="selectMode"
                id="selectModeManual"
                onChange={() => onChange(set(true, ['manuallySelectEvents']))}
                value="a"
              />
            </Inline>
          </Card>
        </Flex>

        <InlinePreview value={value} />

        {value?.manuallySelectEvents && (
          <MemberField
            member={promotedEvents}
            renderInput={renderInput}
            renderField={renderField}
            renderItem={renderItem}
            renderPreview={renderPreview}
          />
        )}

        {!value?.manuallySelectEvents && (
          <>
            <Grid columns={2} gap={3}>
              <MemberField
                member={useTags}
                renderInput={renderInput}
                renderField={renderField}
                renderItem={renderItem}
                renderPreview={renderPreview}
              />
              <MemberField
                member={promotePastEvents}
                renderInput={renderInput}
                renderField={renderField}
                renderItem={renderItem}
                renderPreview={renderPreview}
              />
            </Grid>
            {value?.promotePastEvents && (
              <MemberField
                member={pastEventsCount}
                renderInput={renderInput}
                renderField={renderField}
                renderItem={renderItem}
                renderPreview={renderPreview}
              />
            )}
            {!value?.promotePastEvents && (
              <MemberField
                member={upcomingEventsCount}
                renderInput={renderInput}
                renderField={renderField}
                renderItem={renderItem}
                renderPreview={renderPreview}
              />
            )}
            <Card padding={2} radius={2} shadow={1}>
              <Inline space={2}>
                <Switch
                  id="selectSingleUpcomingPromotion"
                  checked={value?.promoteSingleUpcomingEvent}
                  onChange={() => onChange(set(!value?.promoteSingleUpcomingEvent, ['promoteSingleUpcomingEvent']))}
                />
                <Text as="label" htmlFor="selectSingleUpcomingPromotion">
                  Promote single upcoming event
                </Text>
              </Inline>
            </Card>

            {value?.useTags && (
              <MemberField
                member={selectedTags}
                renderInput={renderInput}
                renderField={renderField}
                renderItem={renderItem}
                renderPreview={renderPreview}
              />
            )}
          </>
        )}
      </Stack>
    </ReadOnlyWrapper>
  )
}
