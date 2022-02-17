const snippets: textSnippet[] = [
  {
    key: 'loading',
    title: 'Loading',
    defaultValue: 'Loading...',
  },
  {
    key: 'menu',
    title: 'Menu',
    defaultValue: 'Menu',
  },
  {
    key: 'all_sites',
    title: 'All sites',
    defaultValue: 'All sites',
  },
  {
    key: 'latest_news',
    title: 'Latest News',
    defaultValue: 'Latest News',
  },
  {
    key: 'tba',
    title: 'To be announced',
    defaultValue: 'To be announced',
  },
  {
    key: 'details',
    title: 'Details',
    defaultValue: 'Details',
  },
  {
    key: 'search',
    title: 'Search',
    defaultValue: 'Search',
  },
  {
    key: 'copyright',
    title: 'Copyright',
    defaultValue: 'Copyright 2022 Equinor ASA',
  },
  {
    key: 'subscribe_form_choose',
    title: 'Subscribe form: Choose validation',
    defaultValue: 'Please choose one or more of the following',
  },
  {
    key: 'subscribe_form_first_name',
    title: 'Subscribe form: First name',
    defaultValue: 'First name',
  },
  {
    key: 'subscribe_form_name_validation',
    title: 'Subscribe form: Name validation',
    defaultValue: 'Please fill out your name',
  },
  {
    key: 'subscribe_form_email',
    title: 'Subscribe form: Email',
    defaultValue: 'Email',
  },
  {
    key: 'subscribe_form_email_validation',
    title: 'Subscribe form: Email validation',
    defaultValue: 'Please fill out a valid email address',
  },
  {
    key: 'subscribe_form_general_news',
    title: 'Subscribe form: General News',
    defaultValue: 'General News',
  },
  {
    key: 'subscribe_form_magazine_stories',
    title: 'Subscribe form: Magazine stories',
    defaultValue: 'Magazine stories',
  },
  {
    key: 'subscribe_form_stock_market',
    title: 'Subscribe form: Stock market announcements',
    defaultValue: 'Stock market announcements',
  },
  {
    key: 'subscribe_form_cruide_oil',
    title: 'Subscribe form: Crude oil assays',
    defaultValue: 'Crude oil assays',
  },
  {
    key: 'subscribe_form_loop_stories',
    title: 'Subscribe form: Loop stories',
    defaultValue: 'Loop stories',
  },
  {
    key: 'subscribe_form_cta',
    title: 'Subscribe form: CTA',
    defaultValue: 'Subscribe',
  },
  {
    key: 'subscribe_form_all',
    title: 'Subscribe form: All',
    defaultValue: 'All',
  },
  {
    key: 'cookie_settings',
    title: 'Cookie Settings',
    defaultValue: 'Cookie settings',
  },
  {
    key: 'cookie_consent',
    title: 'Cookie request consent',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept additional cookies by enabling them in our cookie settings.',
  },
]

type textSnippet = {
  key: string
  title: string
  defaultValue: string
}

export default snippets.sort((a, b) => (a.title < b.title ? -1 : 2))
