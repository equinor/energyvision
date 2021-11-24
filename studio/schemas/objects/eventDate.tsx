import React from 'react'
import type { Rule, ValidationContext } from '@sanity/types'

export type EventDate = {
  _type: 'eventDate'
  preciseTime: boolean
  date?: string
  startDate?: string
  endDate?: string
}

export default {
  title: 'Fields for event date',
  name: 'eventDate',
  type: 'object',
  fields: [
    {
      name: 'preciseTime',
      description: 'Check if the event has an exact start and end time',
      title: 'Precise time',
      type: 'boolean',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      hidden: ({ parent }: { parent: EventDate }) => parent.preciseTime,
      validation: (Rule: Rule) =>
        Rule.custom((field, context: ValidationContext) => {
          const { parent } = context as { parent: EventDate }
          return !parent.preciseTime && field === undefined ? 'Date is required' : true
        }),
    },
    {
      name: 'startDate',
      type: 'datetime',
      title: 'Start date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 5,
        tiimezone: '',
      },
      hidden: ({ parent }: { parent: EventDate }) => !parent.preciseTime,
      validation: (Rule: Rule) =>
        Rule.custom((field: string, context: ValidationContext) => {
          const { parent } = context as { parent: EventDate }
          return parent.preciseTime && field === undefined ? 'Start date is required' : true
        }),
    },
    {
      name: 'endDate',
      type: 'datetime',
      title: 'End date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 5,
        tiimezone: '',
      },
      hidden: ({ parent }: { parent: EventDate }) => !parent.preciseTime,
      validation: (Rule: Rule) =>
        Rule.custom((field: string, context: ValidationContext) => {
          const { parent } = context as { parent: EventDate }
          if (parent.preciseTime && field === undefined) {
            return 'End date is required'
          } else if (parent.preciseTime && parent.startDate && field <= parent.startDate) {
            return 'End date must be greater than start date'
          } else {
            return true
          }
        }),
    },
  ],
}
