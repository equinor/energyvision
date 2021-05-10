// Experimental!  🚧

// What do we need for language?
// What about canonicals?
// Lot's of other stuffs

export type Topics = 'careers' | 'whatWeDo'

type TopicConfixTypes = {
  id: Topics
  title: string
  slug: {
    en: string
    no: string
  }
}

export const topicsList: TopicConfixTypes[] = [
  {
    id: 'careers',
    title: 'Careers',
    slug: {
      en: 'careers',
      no: 'karriere',
    },
  },
  {
    id: 'whatWeDo',
    title: 'What we do',
    slug: {
      en: 'what-we-do',
      no: 'hva-vi-gjør',
    },
  },
]

export const getTopicConfig = (topicPrefix: Topics) => {
  return topicsList.find((topic) => topic.id === topicPrefix)
}
