const snippets: textSnippet = {
  loading: {
    title: 'Loading',
    defaultValue: 'Loading...',
  },
  menu: {
    title: 'Menu',
    defaultValue: 'Menu',
  },
  all_sites: {
    title: 'All sites',
    defaultValue: 'All sites',
  },
  latest_news: {
    title: 'Latest News',
    defaultValue: 'Latest News',
  },
  tba: {
    title: 'To be announced',
    defaultValue: 'To be announced',
  },
  details: {
    title: 'Details',
    defaultValue: 'Details',
  },
  search: {
    title: 'Search',
    defaultValue: 'Search',
  },
  search_events_tab: {
    title: 'Search: Events tab name',
    defaultValue: 'Events',
  },
  search_topics_tab: {
    title: 'Search: Topics tab name',
    defaultValue: 'Topics',
  },
  search_no_results_heading: {
    title: 'Search: no results title',
    defaultValue: 'NOTHING FOUND',
  },
  search_showing_results_number: {
    title: 'Search: Showing X of Y results',
    defaultValue: '{currentlyShowing} of {nbHits} results',
  },
  search_no_results_generic: {
    title: 'Search: no search results, generic',
    defaultValue: 'Sorry, no results were found. Please try again with some different keywords.',
  },
  copyright: {
    title: 'Copyright',
    defaultValue: 'Copyright 2022 Equinor ASA',
  },
  subscribe_form_choose: {
    title: 'Subscribe form: Choose validation',
    defaultValue: 'Please choose one or more of the following',
  },
  subscribe_form_first_name: {
    title: 'Subscribe form: First name',
    defaultValue: 'First name',
  },
  subscribe_form_name_validation: {
    title: 'Subscribe form: Name validation',
    defaultValue: 'Please fill out your name',
  },
  subscribe_form_email: {
    title: 'Subscribe form: Email',
    defaultValue: 'Email',
  },
  subscribe_form_email_validation: {
    title: 'Subscribe form: Email validation',
    defaultValue: 'Please fill out a valid email address',
  },
  subscribe_form_general_news: {
    title: 'Subscribe form: General News',
    defaultValue: 'General News',
  },
  subscribe_form_magazine_stories: {
    title: 'Subscribe form: Magazine stories',
    defaultValue: 'Magazine stories',
  },
  subscribe_form_stock_market: {
    title: 'Subscribe form: Stock market announcements',
    defaultValue: 'Stock market announcements',
  },
  subscribe_form_cruide_oil: {
    title: 'Subscribe form: Crude oil assays',
    defaultValue: 'Crude oil assays',
  },
  subscribe_form_loop_stories: {
    title: 'Subscribe form: Loop stories',
    defaultValue: 'Loop stories',
  },
  subscribe_form_cta: {
    title: 'Subscribe form: CTA',
    defaultValue: 'Subscribe',
  },
  subscribe_form_all: {
    title: 'Subscribe form: All',
    defaultValue: 'All',
  },
  cookie_settings: {
    title: 'Cookie Settings',
    defaultValue: 'Cookie settings',
  },
  cookie_consent: {
    title: 'Cookie request consent',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept additional cookies by enabling them in our cookie settings.',
  },
}

type textSnippet = Record<
  string,
  {
    title: string
    defaultValue: string
  }
>

const sortedTextSnippets = Object.keys(snippets)
  .sort()
  .reduce((obj: textSnippet, key) => {
    obj[key] = snippets[key]
    return obj
  }, {})

export default sortedTextSnippets
