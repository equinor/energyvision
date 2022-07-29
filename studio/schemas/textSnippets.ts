import { HAS_FORMS, HAS_SEARCH, HAS_NEWS, HAS_NEWSROOM, HAS_EVENT, HAS_MAGAZINE } from '../src/lib/datasetHelpers'

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
    hidden: !HAS_NEWS,
  },
  tba: {
    title: 'To be announced',
    defaultValue: 'To be announced',
  },
  add_to_calendar_event: {
    title: 'Event Promotion : Add to Calendar',
    defaultValue: 'Add to Calendar',
    hidden: !HAS_EVENT,
  },
  details: {
    title: 'Event Promotion : Details',
    defaultValue: 'Details',
    hidden: !HAS_EVENT,
  },
  search: {
    title: 'Search',
    defaultValue: 'Search',
    hidden: !HAS_SEARCH,
  },
  search_news_tab: {
    title: 'Search: News tab name',
    defaultValue: 'News',
    hidden: !HAS_SEARCH,
  },
  search_events_tab: {
    title: 'Search: Events tab name',
    defaultValue: 'Events',
    hidden: !HAS_SEARCH,
  },
  search_topics_tab: {
    title: 'Search: Topics tab name',
    defaultValue: 'Topics',
    hidden: !HAS_SEARCH,
  },
  search_no_results_heading: {
    title: 'Search: no results title',
    defaultValue: 'NOTHING FOUND',
    hidden: !HAS_SEARCH,
  },
  search_showing_results_number: {
    title: 'Search: Showing X of Y results',
    defaultValue: '{currentlyShowing} of {nbHits} results',
    hidden: !HAS_SEARCH,
  },
  search_no_results_generic: {
    title: 'Search: no search results, generic',
    defaultValue: 'Sorry, no results were found. Please try again with some different keywords.',
    hidden: !HAS_SEARCH,
  },
  copyright: {
    title: 'Copyright',
    defaultValue: 'Copyright 2022 Equinor ASA',
  },
  subscribe_form_choose: {
    title: 'Subscribe form: Choose validation',
    defaultValue: 'Please choose one or more of the following',
    hidden: !HAS_FORMS,
  },
  subscribe_form_first_name: {
    title: 'Subscribe form: First name',
    defaultValue: 'First name',
    hidden: !HAS_FORMS,
  },
  subscribe_form_name_validation: {
    title: 'Subscribe form: Name validation',
    defaultValue: 'Please fill out your name',
    hidden: !HAS_FORMS,
  },
  subscribe_form_email: {
    title: 'Subscribe form: Email',
    defaultValue: 'Email',
    hidden: !HAS_FORMS,
  },
  subscribe_form_email_validation: {
    title: 'Subscribe form: Email validation',
    defaultValue: 'Please fill out a valid email address',
    hidden: !HAS_FORMS,
  },
  subscribe_form_general_news: {
    title: 'Subscribe form: General News',
    defaultValue: 'General News',
    hidden: !HAS_FORMS,
  },
  subscribe_form_magazine_stories: {
    title: 'Subscribe form: Magazine stories',
    defaultValue: 'Magazine stories',
    hidden: !HAS_FORMS,
  },
  subscribe_form_stock_market: {
    title: 'Subscribe form: Stock market announcements',
    defaultValue: 'Stock market announcements',
    hidden: !HAS_FORMS,
  },
  subscribe_form_cruide_oil: {
    title: 'Subscribe form: Crude oil assays',
    defaultValue: 'Crude oil assays',
    hidden: !HAS_FORMS,
  },
  subscribe_form_cta: {
    title: 'Subscribe form: CTA',
    defaultValue: 'Subscribe',
    hidden: !HAS_FORMS,
  },
  subscribe_form_all: {
    title: 'Subscribe form: All',
    defaultValue: 'All',
    hidden: !HAS_FORMS,
  },
  cookie_settings: {
    title: 'Cookie: Cookie settings link text',
    defaultValue: 'Cookie settings',
  },
  cookie_type_marketing: {
    title: 'Cookie: Type marketing',
    defaultValue: 'marketing',
  },
  cookie_type_statistics: {
    title: 'Cookie: Type statistics',
    defaultValue: 'statistics',
  },
  cookie_consent_header: {
    title: 'Cookie: Consent header',
    defaultValue: 'Accept Cookies',
  },
  cookie_consent: {
    title: 'Cookie: Information text',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept {typeOfCookie} cookies by enabling them in our cookie settings.',
  },
  contact_form_name: {
    title: 'Contact form: Name',
    defaultValue: 'Name',
    hidden: !HAS_FORMS,
  },
  contact_form_name_placeholder: {
    title: 'Contact form: Name Placeholder',
    defaultValue: 'Jane Doe',
    hidden: !HAS_FORMS,
  },
  contact_form_email: {
    title: 'Contact form: Email',
    defaultValue: 'Email',
    hidden: !HAS_FORMS,
  },
  contact_form_name_validation: {
    title: 'Contact form: Name validation',
    defaultValue: 'Please fill out your name',
    hidden: !HAS_FORMS,
  },
  contact_form_email_validation: {
    title: 'Contact form: Email validation',
    defaultValue: 'Please fill out a valid email address',
    hidden: !HAS_FORMS,
  },
  contact_form_category: {
    title: 'Contact form: Category',
    defaultValue: 'Category',
    hidden: !HAS_FORMS,
  },
  contact_form_reaching_out: {
    title: 'Contact form: Who are you trying to reach?',
    defaultValue: 'Who are you trying to reach?',
    hidden: !HAS_FORMS,
  },
  contact_form_how_to_help: {
    title: 'Contact form: How can we help you?',
    defaultValue: 'How can we help you?',
    hidden: !HAS_FORMS,
  },
  contact_form_how_to_help_validation: {
    title: 'Contact form: Please let us know how we may help you',
    defaultValue: 'Please let us know how we may help you',
    hidden: !HAS_FORMS,
  },
  contact_form_ask_us: {
    title: 'Contact form: Ask us a question',
    defaultValue: 'Ask us a question',
    hidden: !HAS_FORMS,
  },
  contact_form_report_error: {
    title: 'Contact form: Report an error',
    defaultValue: 'Report an error',
    hidden: !HAS_FORMS,
  },
  contact_form_contact_department: {
    title: 'Contact form: Contact a department or member of staff',
    defaultValue: 'Contact a department or member of staff',
    hidden: !HAS_FORMS,
  },
  contact_form_investor_relations: {
    title: 'Contact form: Investor relations',
    defaultValue: 'Investor relations',
    hidden: !HAS_FORMS,
  },
  contact_form_human_rights_information_request: {
    title: 'Contact form: Human Rights Information Request',
    defaultValue: 'Human Rights Information Request',
    hidden: !HAS_FORMS,
  },
  contact_form_other: {
    title: 'Contact form: Other',
    defaultValue: 'Other',
    hidden: !HAS_FORMS,
  },
  contact_form_cta: {
    title: 'Contact form: CTA',
    defaultValue: 'Submit form',
    hidden: !HAS_FORMS,
  },
  career_fair_form_organisation: {
    title: 'Career fair form: Organisation',
    defaultValue: 'School / Organisation',
    hidden: !HAS_FORMS,
  },

  career_fair_form_organisation_validation: {
    title: 'Career fair form: Organisation validation',
    defaultValue: 'Please enter your school or organisation',
    hidden: !HAS_FORMS,
  },
  career_fair_form_contact_person: {
    title: 'Career fair form: Contact Person',
    defaultValue: 'Contact Person',
    hidden: !HAS_FORMS,
  },
  career_fair_form_contact_person_validation: {
    title: 'Career fair form: Contact Person validation',
    defaultValue: 'Please enter a contact person',
    hidden: !HAS_FORMS,
  },
  career_fair_form_name_placeholder: {
    title: 'Contact form: Name Placeholder',
    defaultValue: 'Jane Doe',
    hidden: !HAS_FORMS,
  },
  career_fair_form_phone: {
    title: 'Career fair form: Phone number',
    defaultValue: 'Phone number',
    hidden: !HAS_FORMS,
  },
  career_fair_form_phone_validation: {
    title: 'Career fair form: Phone Number validation',
    defaultValue: 'Please enter your phone number',
    hidden: !HAS_FORMS,
  },
  career_fair_form_email: {
    title: 'Career fair form: Email',
    defaultValue: 'Email',
    hidden: !HAS_FORMS,
  },
  career_fair_form_email_validation: {
    title: 'Career fair form: Email validation',
    defaultValue: 'Please fill out a valid email address',
    hidden: !HAS_FORMS,
  },
  career_fair_form_event: {
    title: 'Career fair form: Event',
    defaultValue: 'Event',
    hidden: !HAS_FORMS,
  },
  career_fair_form_event_description: {
    title: 'Career fair form: Event Description',
    defaultValue: 'Event Description (max 3400 characters)',
    hidden: !HAS_FORMS,
  },
  career_fair_form_event_description_validation: {
    title: 'Career fair form: Event Description validation',
    defaultValue: 'Please enter a description for the event',
    hidden: !HAS_FORMS,
  },
  career_fair_form_website: {
    title: 'Career fair form: Link to website',
    defaultValue: 'Link to website',
    hidden: !HAS_FORMS,
  },
  career_fair_form_supporting_documents: {
    title: 'Career fair form: Supporting Documents checkbox',
    defaultValue: 'Tick the box if you would like to send supporting documents, and we will get in touch with you',
    hidden: !HAS_FORMS,
  },
  career_fair_form_invite_career_fair: {
    title: 'Career fair form: Invite to career fair/ student event',
    defaultValue: 'Invite Equinor to a career fair or student event',
    hidden: !HAS_FORMS,
  },
  career_fair_form_invite_company_presentation: {
    title: 'Career fair form: Invite to hold company presentation',
    defaultValue: 'Invite Equinor to hold a company presentation',
    hidden: !HAS_FORMS,
  },
  career_fair_form_visit_equinor: {
    title: 'Career fair form: Visit Equinor office',
    defaultValue: 'Would like to visit Equinor office or facility',
    hidden: !HAS_FORMS,
  },
  career_fair_form_visit_equinor_helper_text: {
    title: 'Career fair form: We offer visits to a few locations',
    defaultValue:
      'Please be aware that we only offer visits to a few selected locations. Please specify your preferred location and we will revert to you as soon as we can.',
    hidden: !HAS_FORMS,
  },
  career_fair_form_cta: {
    title: 'Career fair form: CTA',
    defaultValue: 'Submit form',
    hidden: !HAS_FORMS,
  },

  order_reports_form_name: {
    title: 'Order annual reports form: Name',
    defaultValue: 'Name',
    hidden: !HAS_FORMS,
  },

  order_reports_form_name_validation: {
    title: 'Order annual reports form: Enter name',
    defaultValue: 'Please enter your name',
    hidden: !HAS_FORMS,
  },
  order_reports_form_name_placeholder: {
    title: 'Order annual reports form: Name placeholder',
    defaultValue: 'Jane Doe',
    hidden: !HAS_FORMS,
  },

  order_reports_form_email: {
    title: 'Order annual reports form: Email',
    defaultValue: 'Email',
    hidden: !HAS_FORMS,
  },
  order_reports_form_email_validation: {
    title: 'Order annual reports form: Email validation',
    defaultValue: 'Please fill out a valid email address',
    hidden: !HAS_FORMS,
  },
  order_reports_form_company: {
    title: 'Order annual reports form: Company',
    defaultValue: 'Company',
    hidden: !HAS_FORMS,
  },
  order_reports_form_company_validation: {
    title: 'Order annual reports form: Company Validation',
    defaultValue: 'Please enter your company',
    hidden: !HAS_FORMS,
  },
  order_reports_form_address: {
    title: 'Order annual reports form: Address',
    defaultValue: 'Address',
    hidden: !HAS_FORMS,
  },
  order_reports_form_address_validation: {
    title: 'Order annual reports form: Address Validation',
    defaultValue: 'Please enter your address',
    hidden: !HAS_FORMS,
  },
  order_reports_form_zipcode: {
    title: 'Order annual reports form: Address',
    defaultValue: 'Post number/Zip code',
    hidden: !HAS_FORMS,
  },
  order_reports_form_zipcode_validation: {
    title: 'Order annual reports form: zipcode Validation',
    defaultValue: 'Please enter your post number/Zip code',
    hidden: !HAS_FORMS,
  },
  order_reports_form_city: {
    title: 'Order annual reports form: City',
    defaultValue: 'City',
    hidden: !HAS_FORMS,
  },
  order_reports_form_city_validation: {
    title: 'Order annual reports form: City Validation',
    defaultValue: 'Please enter your city',
    hidden: !HAS_FORMS,
  },
  order_reports_form_country: {
    title: 'Order annual reports form: Country',
    defaultValue: 'Country',
    hidden: !HAS_FORMS,
  },
  order_reports_form_country_validation: {
    title: 'Order annual reports form: Country Validation',
    defaultValue: 'Please enter your country',
    hidden: !HAS_FORMS,
  },

  order_reports_form_cta: {
    title: 'Order annual reports form: CTA',
    defaultValue: 'Order printed copies',
    hidden: !HAS_FORMS,
  },

  order_reports_form_choose: {
    title: 'Order reports form: Choose validation',
    defaultValue: 'Please select atleast one of the reports',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_name: {
    title: 'Careers contact form: Name',
    defaultValue: 'Your Name',
    hidden: !HAS_FORMS,
  },

  careers_contact_form_name_placeholder: {
    title: 'Careers contact form: Name Placeholder',
    defaultValue: 'Jane Doe',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_email: {
    title: 'Careers contact form: Email',
    defaultValue: 'Email',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_name_validation: {
    title: 'Careers contact form: Name validation',
    defaultValue: 'Please fill out your name',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_email_validation: {
    title: 'Careers contact form: Email validation',
    defaultValue: 'Please fill out a valid email address',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_category: {
    title: 'Careers contact form: Category',
    defaultValue: 'Category',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_questions: {
    title: 'Careers contact form: Type your questions',
    defaultValue: 'Type your questions',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_location: {
    title: 'Careers contact form: Location',
    defaultValue: 'Location',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_thesis_writing: {
    title: 'Careers contact form: Thesis writing',
    defaultValue: 'Thesis writing',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_questions_related_to_position: {
    title: 'Careers contact form: Questions related to a specific position',
    defaultValue: 'Questions related to a specific position',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_technical_issues: {
    title: 'Careers contact form: Technical issue when applying for a specific position',
    defaultValue: 'Technical issue when applying for a specific position',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_phone: {
    title: 'Careers contact form: Phone number',
    defaultValue: 'Phone number',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_phone_validation: {
    title: 'Careers contact form: Phone Number validation',
    defaultValue: 'Please enter your phone number',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_phone_placeholder: {
    title: 'Careers contact form: Phone Number placeholder',
    defaultValue: 'Country code and phone number',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_position: {
    title: 'Careers contact form: Position Id/ Name',
    defaultValue: 'Position ID/name',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_cta: {
    title: 'Careers Contact form: CTA',
    defaultValue: 'Submit form',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_location_validation: {
    title: 'Careers contact form: Location validation',
    defaultValue: 'Enter a location',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_location_placeholder: {
    title: 'Careers contact form: Country/city',
    defaultValue: 'Country/city',
    hidden: !HAS_FORMS,
  },
  careers_contact_form_questions_validation: {
    title: 'Careers contact form: Questions validation',
    defaultValue: 'Please enter a question',
    hidden: !HAS_FORMS,
  },
  form_sending: {
    title: 'Form: Sending...',
    defaultValue: 'Sending...',
    hidden: !HAS_FORMS,
  },
  form_failure_title: {
    title: 'Form: Failure title',
    defaultValue: 'Sorry, something went wrong!',
    hidden: !HAS_FORMS,
  },
  form_failure_line1: {
    title: 'Form: Failure line1',
    defaultValue: 'The form was not submitted.',
    hidden: !HAS_FORMS,
  },
  form_failure_line2: {
    title: 'Form: Failure line2',
    defaultValue: 'Please try again',
    hidden: !HAS_FORMS,
  },
  form_failure_cta: {
    title: 'Form: Failure CTA',
    defaultValue: 'Try again',
    hidden: !HAS_FORMS,
  },
  form_success_title: {
    title: 'Form: Success title',
    defaultValue: 'Thank you!',
    hidden: !HAS_FORMS,
  },
  form_success_line1: {
    title: 'Form: Success line1',
    defaultValue: 'Your form was successfully submitted.',
    hidden: !HAS_FORMS,
  },
  form_success_line2: {
    title: 'Form: Success line2',
    defaultValue: 'You will hear from us shortly.',
    hidden: !HAS_FORMS,
  },
  form_success_cta: {
    title: 'Form: Success CTA',
    defaultValue: 'Reopen the form',
    hidden: !HAS_FORMS,
  },
  newsroom_topic_filter: {
    title: 'Newsroom: Topic filter heading',
    defaultValue: 'Topic',
    hidden: !HAS_NEWSROOM,
  },
  newsroom_country_filter: {
    title: 'Newsroom: Country filter heading',
    defaultValue: 'Country',
    hidden: !HAS_NEWSROOM,
  },
  newsroom_year_filter: {
    title: 'Newsroom: Year filter heading',
    defaultValue: 'Year',
    hidden: !HAS_NEWSROOM,
  },
  newsroom_newslist_header: {
    title: 'Newsroom: News list heading',
    defaultValue: 'News',
    hidden: !HAS_NEWSROOM,
  },
  newsroom_no_relevant_filters: {
    title: 'Newsroom: No options for a filter',
    defaultValue: 'No relevant content for this filter',
    hidden: !HAS_NEWSROOM,
  },
  newsroom_no_hits: {
    title: 'Newsroom: No hits',
    defaultValue: 'Your search returned no results',
    hidden: !HAS_NEWSROOM,
  },
  magazineindex_list_header: {
    title: 'Magazine index: Stories list heading',
    defaultValue: 'Stories',
    hidden: !HAS_MAGAZINE,
  },
  stock_nyse_time_delay_message: {
    title: 'Stock API: NYSE time delay message',
    defaultValue: 'at least 20 minutes delayed',
  },
}

type textSnippet = Record<
  string,
  {
    title: string
    defaultValue: string
    hidden?: boolean
  }
>

const sortedTextSnippets = Object.keys(snippets)
  .filter((key) => !snippets[key].hidden)
  .sort()
  .reduce((obj: textSnippet, key) => {
    obj[key] = snippets[key]
    return obj
  }, {})

export default sortedTextSnippets
