import { IntlProvider } from 'react-intl'
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'
import { FormattedDate, FormattedTime, FormattedDateTime, DateTimeProps, FormattedTimeProps } from '@components'

const Wrapper = styled.div`
  margin: 32px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(4, fit-content(100%));
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

export const Default: Story<DateTimeProps> = (args) => {
  const { datetime } = args
  const now = new Date()
  const dtString = datetime ? datetime : now.toString()

  return (
    <>
      <FormattedDateTime {...args} datetime={dtString} />
    </>
  )
}

export const DateTime: Story<DateTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedDateTime datetime={datetime.toString()} />
      <FormattedDateTime datetime={datetime.toString()} withIcon={false} />
    </Wrapper>
  )
}

DateTime.parameters = {
  docs: {
    storyDescription: `For formatting both date and time, based on a datetime string. Icon shown by default.`,
  },
}

export const JustDate: Story<DateTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedDate datetime={datetime.toString()} />
      <FormattedDate datetime={datetime.toString()} withIcon={true} />
    </Wrapper>
  )
}

JustDate.parameters = {
  docs: {
    storyDescription: `For formatting just a date, based on a datetime string. Icon hidden by default.`,
  },
}

export const JustTime: Story<FormattedTimeProps> = () => {
  const datetime = new Date()

  return (
    <Wrapper>
      <FormattedTime datetime={datetime.toString()} />
      <FormattedTime datetime={datetime.toString()} withIcon={true} />
    </Wrapper>
  )
}

JustTime.parameters = {
  docs: {
    storyDescription: `For formatting just a time, based on a datetime string. Icon hidden by default.`,
  },
}
