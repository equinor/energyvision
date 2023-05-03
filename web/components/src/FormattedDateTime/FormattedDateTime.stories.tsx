import { IntlProvider } from 'react-intl'
import type { StoryFn, Meta } from '@storybook/react'
import styled from 'styled-components'
import { FormattedDate, FormattedTime, FormattedDateTime, DateTimeProps, FormattedTimeProps } from '@components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * ~ * {
    margin-top: 0.5em;
  }
`

export default {
  title: 'Components/FormattedDateTime',
  component: FormattedDateTime,
  parameters: {
    docs: {
      description: {
        component: `Components for formatting a datetime string.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="no">
        <Story />
      </IntlProvider>
    ),
  ],
} as Meta

export const Default: StoryFn<DateTimeProps> = (args) => {
  const { datetime } = args
  const now = new Date()
  const dtString = datetime ? datetime : now.toString()

  return (
    <>
      <FormattedDateTime {...args} datetime={dtString} />
    </>
  )
}
export const Uppercase: StoryFn<DateTimeProps> = () => {
  const datetime = new Date()

  return (
    <>
      <FormattedDateTime uppercase datetime={datetime.toString()} />
    </>
  )
}
Uppercase.parameters = {
  docs: {
    storyDescription: `In the news articles, the dates should be uppercase`,
  },
}

export const DateTime: StoryFn<DateTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedDateTime datetime={datetime.toString()} />
      <FormattedDateTime datetime={datetime.toString()} icon />
      <FormattedDateTime datetime={datetime.toString()} icon timezone />
    </Wrapper>
  )
}

DateTime.parameters = {
  docs: {
    storyDescription: `For formatting both date and time, based on a datetime string. Icon shown by default.`,
  },
}

export const JustDate: StoryFn<DateTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedDate datetime={datetime.toString()} />
      <FormattedDate datetime={datetime.toString()} icon />
    </Wrapper>
  )
}

JustDate.parameters = {
  docs: {
    storyDescription: `For formatting just a date, based on a datetime string. Icon hidden by default.`,
  },
}

export const JustTime: StoryFn<FormattedTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedTime datetime={datetime.toString()} />
      <FormattedTime datetime={datetime.toString()} icon />
      <FormattedTime datetime={datetime.toString()} icon timezone />
    </Wrapper>
  )
}

JustTime.parameters = {
  docs: {
    storyDescription: `For formatting just a time, based on a datetime string. Icon hidden by default.`,
  },
}
