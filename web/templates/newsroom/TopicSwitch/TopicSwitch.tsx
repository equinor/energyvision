import { forwardRef, HTMLAttributes, useContext, useState } from 'react'
import { Checkbox } from '@equinor/eds-core-react'
import { Tag } from '../../../types/types'
import { useFilter } from '../FilterContext'

export type TopicSwitchProps = {
  topics: Tag[]
  selectedTopics: Tag[]
  onTopicChange: (newTopic: string) => void
} & HTMLAttributes<HTMLLIElement>

const TopicSwitch = forwardRef<HTMLElement, TopicSwitchProps>(function TopicSwitch(
  { topics, className = '', ...rest },
  ref,
) {
  console.log('topics', topics)
  const { selectedTopics, setSelectedTopics } = useFilter()

  const handleTopicChange = (newTopic: Tag) => {
    console.log('TopicSwitch handle topic change', newTopic)
    //Remove from list if already there, or else add
    if (selectedTopics?.some((selectedTopic: any) => selectedTopic.id === newTopic.id)) {
      setSelectedTopics(
        selectedTopics.filter((selectedTopic: any) => {
          selectedTopic.id !== newTopic?.id
        }),
      )
    } else {
      setSelectedTopics([...selectedTopics, newTopic])
    }
  }

  return (
    <fieldset ref={ref} className="p-0">
      <legend className="pb-2">Select topic</legend>
      <div className="border border-autumn-storm-60 rounded-md pl-1 pr-6 py-4 flex flex-col">
        {topics &&
          topics.map((topic) => {
            return (
              <Checkbox
                key={topic.id}
                name={topic.key}
                label={topic.title}
                onChange={() => {
                  handleTopicChange(topic)
                }}
                checked={selectedTopics?.some((selectedTopic) => selectedTopic?.id === topic?.id)}
              />
            )
          })}
      </div>
    </fieldset>
  )
})
export default TopicSwitch
