import { Flags } from '../src/lib/datasetHelpers'

export const groups = {
  newsroom: { title: 'Newsroom', hidden: !Flags.HAS_NEWSROOM },
  magazine: { title: 'Magazine', hidden: !Flags.HAS_MAGAZINE },
  search: { title: 'Search', hidden: !Flags.HAS_SEARCH },
  eventPromotion: { title: 'Event', hidden: !Flags.HAS_EVENT },
  subscribeForm: { title: 'Subscribe form', hidden: !Flags.HAS_SUBSCRIBE_FORM },
  careerFairForm: { title: 'Career fair form', hidden: !Flags.HAS_CAREER_FAIR_AND_VISITS_FORM },
  contactForm: { title: 'Contact form', hidden: !Flags.HAS_CONTACT_EQUINOR_FORM },
  careerContactForm: { title: 'Careers Contact Form', hidden: !Flags.HAS_CAREERS_CONTACT_FORM },
  orderAnnualReportsForm: { title: 'Order annual reports form', hidden: !Flags.HAS_ORDER_REPORT_FORM },
  pensionForm: { title: 'Pension form', hidden: !Flags.HAS_PENSION_FORM },
  form: { title: 'Form', hidden: !Flags.HAS_FORMS },
  cookie: { title: 'Cookie' },
  carousel: { title: 'Carousel' },
  others: { title: 'Others' },
  common: { title: 'Common' },
}
const snippets: textSnippet = {
  country_code_format: {
    title: 'Enter country code with phone number',
    defaultValue: 'Enter  country code with phone number',
    group: groups.form,
  },
  all_fields_mandatory: {
    title: 'All fields with * are mandatory',
    defaultValue: 'All fields with * are mandatory',
    group: groups.form,
  },
  loading: {
    title: 'Loading',
    defaultValue: 'Loading...',
    group: groups.others,
  },
  read_transcript: {
    title: 'Read Transcript',
    defaultValue: 'Read transcript',
    group: groups.others,
  },
  menu: {
    title: 'Menu',
    defaultValue: 'Menu',
    group: groups.others,
  },
  all_sites: {
    title: 'All sites',
    defaultValue: 'All sites',
    group: groups.others,
  },
  latest_news: {
    title: 'Latest News',
    defaultValue: 'Latest News',
    hidden: !Flags.HAS_NEWS,
    group: groups.others,
  },
  breadcrumbs_home: {
    title: 'Breadcrumbs : Home',
    defaultValue: 'Home',
    group: groups.others,
  },
  tba: {
    title: 'To be announced',
    defaultValue: 'To be announced',
    group: groups.eventPromotion,
  },
  add_to_calendar_event: {
    title: 'Add to Calendar',
    defaultValue: 'Add to Calendar',
    group: groups.eventPromotion,
  },
  details: {
    title: 'Details',
    defaultValue: 'Details',
    group: groups.eventPromotion,
  },
  add_to_calendar_aria_label: {
    title: 'Add event to calendar',
    defaultValue: `Add {eventTitle} to calendar`,
    group: groups.eventPromotion,
  },
  search: {
    title: 'Search',
    defaultValue: 'Search',
    group: groups.search,
  },
  search_quick_search: {
    title: 'Quick search',
    defaultValue: 'Quick search',
    group: groups.search,
  },
  search_quick_search_label: {
    title: 'Quick search label',
    defaultValue: 'Search among Equinor corporate-level news releases',
    group: groups.search,
  },
  search_news_tab: {
    title: 'News tab name',
    defaultValue: 'News',
    group: groups.search,
  },
  search_magazine_tab: {
    title: 'Magazine tab name',
    defaultValue: 'Magazine',
    group: groups.magazine,
  },
  search_events_tab: {
    title: 'Events tab name',
    defaultValue: 'Events',
    group: groups.search,
  },
  search_topics_tab: {
    title: 'Topics tab name',
    defaultValue: 'Topics',
    group: groups.search,
  },
  search_no_results_heading: {
    title: 'No results title',
    defaultValue: 'NOTHING FOUND',
    group: groups.search,
  },
  search_showing_results_number: {
    title: 'Showing X of Y results',
    defaultValue: '{currentlyShowing} of {nbHits} results',
    group: groups.search,
  },
  search_no_results_generic: {
    title: 'No search results, generic',
    defaultValue: 'Sorry, no results were found. Please try again with some different keywords.',
    group: groups.search,
  },
  search_submit: {
    title: 'Submit search',
    defaultValue: 'Submit search',
    group: groups.search,
  },
  search_reset: {
    title: 'Reset',
    defaultValue: 'Reset',
    group: groups.search,
  },
  search_filter_by: {
    title: 'Filter by',
    defaultValue: 'Filter by',
    group: groups.search,
  },
  search_pagination_first_page: {
    title: 'First page',
    defaultValue: 'First page',
    group: groups.search,
  },
  search_pagination_last_page: {
    title: 'Last page',
    defaultValue: 'Last page',
    group: groups.search,
  },
  copyright: {
    title: 'Copyright',
    defaultValue: 'Copyright 2022 Equinor ASA',
    group: groups.others,
  },
  subscribe_form_choose: {
    title: 'Choose validation',
    defaultValue: 'Please choose one or more of the following',
    group: groups.subscribeForm,
  },
  subscribe_form_general_news: {
    title: 'General News',
    defaultValue: 'General News',
    group: groups.subscribeForm,
  },
  subscribe_form_magazine_stories: {
    title: 'Magazine stories',
    defaultValue: 'Magazine stories',
    group: groups.subscribeForm,
  },
  subscribe_form_stock_market: {
    title: 'Stock market announcements',
    defaultValue: 'Stock market announcements',
    group: groups.subscribeForm,
  },
  subscribe_form_cruide_oil: {
    title: 'Crude oil assays',
    defaultValue: 'Crude oil assays',
    group: groups.subscribeForm,
  },
  subscribe_form_cta: {
    title: 'CTA',
    defaultValue: 'Subscribe',
    group: groups.subscribeForm,
  },
  subscribe_form_all: {
    title: 'All',
    defaultValue: 'All',
    group: groups.subscribeForm,
  },
  cookie_settings: {
    title: 'Cookie settings link text',
    defaultValue: 'Cookie settings',
    group: groups.cookie,
  },
  cookie_type_marketing: {
    title: 'Type marketing',
    defaultValue: 'marketing',
    group: groups.cookie,
  },
  cookie_type_statistics: {
    title: 'Type statistics',
    defaultValue: 'statistics',
    group: groups.cookie,
  },
  cookie_type_preferences: {
    title: 'Type preferences',
    defaultValue: 'preferences',
    group: groups.cookie,
  },
  cookie_consent_header: {
    title: 'Consent header',
    defaultValue: 'Accept Cookies',
    group: groups.cookie,
  },
  cookie_consent: {
    title: 'Information text',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept {typeOfCookie} cookies by enabling them in our cookie settings.',
    group: groups.cookie,
  },
  cookie_consent_two: {
    title: 'Information text - for two types of cookies',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept {type1} and {type2} cookies by enabling them in our cookie settings.',
    group: groups.cookie,
  },
  cookie_consent_many: {
    title: 'Information text - for all types of cookies ',
    defaultValue:
      'Want the full picture? We’d love to share this content with you, but first you must accept {type1}, {type2} and {type3} cookies by enabling them in our cookie settings.',
    group: groups.cookie,
  },
  contact_form_category: {
    title: 'Category',
    defaultValue: 'Category',
    group: groups.contactForm,
  },
  contact_form_how_to_help: {
    title: 'How can we help you?',
    defaultValue: 'How can we help you?',
    group: groups.contactForm,
  },
  contact_form_how_to_help_validation: {
    title: 'Please let us know how we may help you',
    defaultValue: 'Please let us know how we may help you',
    group: groups.contactForm,
  },
  contact_form_report_error: {
    title: 'Report an error',
    defaultValue: 'Report an error',
    group: groups.contactForm,
  },
  contact_form_contact_department: {
    title: 'Contact a department or member of staff',
    defaultValue: 'Contact a department or member of staff',
    group: groups.contactForm,
  },
  contact_form_investor_relations: {
    title: 'Investor relations',
    defaultValue: 'Investor relations',
    group: groups.contactForm,
  },
  contact_form_human_rights_information_request: {
    title: 'Human Rights Information Request',
    defaultValue: 'Human Rights Information Request',
    group: groups.contactForm,
  },
  contact_form_login_issues: {
    title: 'Login Issues',
    defaultValue: 'Login Issues',
    group: groups.contactForm,
  },
  contact_form_other: {
    title: 'Other',
    defaultValue: 'Other',
    group: groups.contactForm,
  },
  contact_form_cta: {
    title: 'CTA',
    defaultValue: 'Submit form',
    group: groups.contactForm,
  },
  pension_form_category_pension: {
    title: 'Pension Category',
    defaultValue: 'Pension',
    group: groups.pensionForm,
  },
  pension_form_select_topic: {
    title: 'Default Pension Category',
    defaultValue: 'Pension',
    group: groups.pensionForm,
  },
  pension_form_category_travel_insurance: {
    title: 'Travel Insurance Category',
    defaultValue: 'Travel Insurance',
    group: groups.pensionForm,
  },
  pension_form_category_other: {
    title: 'Other Pension/Insurance Related Category',
    defaultValue: 'Other Pension/Insurance Related',
    group: groups.pensionForm,
  },
  pension_form_what_is_your_request: {
    title: 'What is your request?',
    defaultValue: 'What is your request?',
    group: groups.pensionForm,
  },
  pension_form_what_is_your_request_validation: {
    title: 'Requests Validation',
    defaultValue: 'Please let us know how we may help you',
    group: groups.pensionForm,
  },
  pension_form_submit: {
    title: 'Submit Button Text',
    defaultValue: 'Submit Form',
    group: groups.pensionForm,
  },
  footer_to_top_button: {
    title: 'To top button',
    defaultValue: 'To top',
    group: groups.others,
  },
  career_fair_form_organisation: {
    title: 'Organisation',
    defaultValue: 'School / Organisation',
    group: groups.careerFairForm,
  },

  career_fair_form_organisation_validation: {
    title: 'Organisation validation',
    defaultValue: 'Please enter your school or organisation',
    group: groups.careerFairForm,
  },
  career_fair_form_contact_person: {
    title: 'Contact Person',
    defaultValue: 'Contact Person',
    group: groups.careerFairForm,
  },
  career_fair_form_contact_person_validation: {
    title: 'Contact Person validation',
    defaultValue: 'Please enter a contact person',
    group: groups.careerFairForm,
  },
  career_fair_form_name_placeholder: {
    title: 'Name Placeholder',
    defaultValue: 'Jane Doe',
    group: groups.careerFairForm,
  },
  career_fair_form_phone: {
    title: 'Phone number',
    defaultValue: 'Phone number',
    group: groups.careerFairForm,
  },
  career_fair_form_phone_validation: {
    title: 'Phone Number validation',
    defaultValue: 'Please enter your phone number',
    group: groups.careerFairForm,
  },
  career_fair_form_event: {
    title: 'Event',
    defaultValue: 'Event',
    group: groups.careerFairForm,
  },
  career_fair_form_event_description: {
    title: 'Event Description',
    defaultValue: 'Event Description (max 3400 characters)',
    group: groups.careerFairForm,
  },
  career_fair_form_event_description_validation: {
    title: 'Event Description validation',
    defaultValue: 'Please enter a description for the event',
    group: groups.careerFairForm,
  },
  career_fair_form_website: {
    title: 'Link to website',
    defaultValue: 'Link to website',
    group: groups.careerFairForm,
  },
  career_fair_form_supporting_documents: {
    title: 'Supporting Documents checkbox',
    defaultValue: 'Tick the box if you would like to send supporting documents, and we will get in touch with you',
    group: groups.careerFairForm,
  },
  career_fair_form_invite_career_fair: {
    title: 'Invite to career fair/ student event',
    defaultValue: 'Invite Equinor to a career fair or student event',
    group: groups.careerFairForm,
  },
  career_fair_form_visit_equinor: {
    title: 'Visit Equinor office',
    defaultValue: 'Would like to visit Equinor office or facility',
    group: groups.careerFairForm,
  },
  career_fair_form_visit_equinor_helper_text: {
    title: 'We offer visits to a few locations',
    defaultValue:
      'Please be aware that we only offer visits to a few selected locations. Please specify your preferred location and we will revert to you as soon as we can.',
    group: groups.careerFairForm,
  },
  career_fair_form_cta: {
    title: 'CTA',
    defaultValue: 'Submit form',
    group: groups.careerFairForm,
  },
  order_reports_form_company: {
    title: 'Company',
    defaultValue: 'Company',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_company_validation: {
    title: 'Company Validation',
    defaultValue: 'Please enter your company',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_address: {
    title: 'Address',
    defaultValue: 'Address',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_address_validation: {
    title: 'Address Validation',
    defaultValue: 'Please enter your address',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_zipcode: {
    title: 'Address',
    defaultValue: 'Post number/Zip code',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_zipcode_validation: {
    title: 'zipcode Validation',
    defaultValue: 'Please enter your post number/Zip code',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_city: {
    title: 'City',
    defaultValue: 'City',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_city_validation: {
    title: 'City Validation',
    defaultValue: 'Please enter your city',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_country: {
    title: 'Country',
    defaultValue: 'Country',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_country_validation: {
    title: 'Country Validation',
    defaultValue: 'Please enter your country',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_cta: {
    title: 'CTA',
    defaultValue: 'Order printed copies',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_form_choose: {
    title: 'Choose validation',
    defaultValue: 'Please select atleast one of the reports',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_checkbox_option_annualReport_label: {
    title: 'Annual report (english version) option',
    defaultValue: 'Annual report (english version)',
    group: groups.orderAnnualReportsForm,
  },
  order_reports_checkbox_option_statutoryReport_label: {
    title: 'Annual report (norwegian version) option',
    defaultValue: 'Annual report (norwegian version)',
    group: groups.orderAnnualReportsForm,
  },
  careers_contact_form_questions: {
    title: 'Type your questions',
    defaultValue: 'Type your questions',
    group: groups.careerContactForm,
  },
  careers_contact_form_location: {
    title: 'Location',
    defaultValue: 'Location',
    group: groups.careerContactForm,
  },
  careers_contact_form_onboarding: {
    title: 'Onboarding',
    defaultValue: 'Onboarding',
    group: groups.careerContactForm,
  },
  careers_contact_form_questions_related_to_position: {
    title: 'Questions related to a specific position',
    defaultValue: 'Questions related to a specific position',
    group: groups.careerContactForm,
  },
  careers_contact_form_technical_issues: {
    title: 'Technical issue when applying for a specific position',
    defaultValue: 'Technical issue when applying for a specific position',
    group: groups.careerContactForm,
  },
  careers_contact_form_suspected_recruitment_scam: {
    title: 'Suspected recruitment scam',
    defaultValue: 'Suspected recruitment scam',
    group: groups.careerContactForm,
  },
  careers_contact_form_phone: {
    title: 'Phone number',
    defaultValue: 'Phone number',
    group: groups.careerContactForm,
  },
  careers_contact_form_phone_validation: {
    title: 'Phone Number validation',
    defaultValue: 'Please enter your phone number',
    group: groups.careerContactForm,
  },
  careers_contact_form_positionId_validation: {
    title: 'Position ID validation',
    defaultValue: 'Please enter a position ID or name',
    group: groups.careerContactForm,
  },
  careers_contact_form_phone_placeholder: {
    title: 'Phone Number placeholder',
    defaultValue: 'Country code and phone number',
    group: groups.careerContactForm,
  },
  careers_contact_form_position: {
    title: 'Position Id/ Name',
    defaultValue: 'Position ID/name',
    group: groups.careerContactForm,
  },
  careers_contact_form_cta: {
    title: 'CTA',
    defaultValue: 'Submit form',
    group: groups.careerContactForm,
  },
  careers_contact_form_location_validation: {
    title: 'Location validation',
    defaultValue: 'Enter a location',
    group: groups.careerContactForm,
  },
  careers_contact_form_location_placeholder: {
    title: 'Country/city',
    defaultValue: 'Country/city',
    group: groups.careerContactForm,
  },
  careers_contact_form_questions_validation: {
    title: 'Questions validation',
    defaultValue: 'Please enter a question',
    group: groups.careerContactForm,
  },
  careers_contact_form_candidate_type: {
    title: 'Candidate type',
    defaultValue: 'Candidate type',
    group: groups.careerContactForm,
  },

  careers_contact_form_experienced_professionals: {
    title: 'Experienced professionals',
    defaultValue: 'Experienced professionals',
    group: groups.careerContactForm,
  },
  careers_contact_form_graduates: {
    title: 'Graduates',
    defaultValue: 'Graduates',
    group: groups.careerContactForm,
  },
  careers_contact_form_interns: {
    title: 'Interns (e.g. summer, academic)',
    defaultValue: 'Interns (e.g. summer, academic)',
    group: groups.careerContactForm,
  },
  careers_contact_form_apprentices: {
    title: 'Apprentices/lærlinger',
    defaultValue: 'Apprentices/lærlinger',
    group: groups.careerContactForm,
  },
  careers_contact_form_other: {
    title: 'Other',
    defaultValue: 'Other',
    group: groups.careerContactForm,
  },
  careers_contact_form_supporting_documents: {
    title: 'Supporting Documents checkbox',
    defaultValue: 'Tick the box if you would like to send supporting documents, and we will get in touch with you',
    group: groups.careerContactForm,
  },
  form_sending: {
    title: 'Sending...',
    defaultValue: 'Sending...',
    group: groups.form,
  },
  form_please_select_an_option: {
    title: 'Please select an option',
    defaultValue: 'Please select an option',
    group: groups.form,
  },
  form_failure_title: {
    title: 'Failure title',
    defaultValue: 'Sorry, something went wrong!',
    group: groups.form,
  },
  form_failure_line1: {
    title: 'Failure line1',
    defaultValue: 'The form was not submitted.',
    group: groups.form,
  },
  form_failure_line2: {
    title: 'Failure line2',
    defaultValue: 'Please try again',
    group: groups.form,
  },
  form_failure_cta: {
    title: 'Failure CTA',
    defaultValue: 'Try again',
    group: groups.form,
  },
  form_success_title: {
    title: 'Success title',
    defaultValue: 'Thank you!',
    group: groups.form,
  },
  form_success_line1: {
    title: 'Success line1',
    defaultValue: 'Your form was successfully submitted.',
    group: groups.form,
  },
  form_success_line2: {
    title: 'Success line2',
    defaultValue: 'You will hear from us shortly.',
    group: groups.form,
  },
  form_success_cta: {
    title: 'Success CTA',
    defaultValue: 'Reopen the form',
    group: groups.form,
  },
  form_validation_maxChars: {
    title: 'Max X chars',
    defaultValue: 'Max {maxChars} characters',
    group: groups.form,
  },
  form_antirobot_validation_required: {
    title: 'Anti-Robot verification is required',
    defaultValue: 'Anti-Robot verification is required',
    group: groups.form,
  },
  newsroom_topic_filter: {
    title: 'Topic filter heading',
    defaultValue: 'Topic',
    group: groups.newsroom,
  },
  newsroom_filters_label: {
    title: 'Filters label',
    defaultValue: 'Filter by:',
    group: groups.newsroom,
  },
  newsroom_filters_selected: {
    title: 'Selected',
    defaultValue: 'Selected',
    group: groups.newsroom,
  },
  newsroom_filters_clear_all: {
    title: 'Clear all',
    defaultValue: 'Clear all',
    group: groups.newsroom,
  },
  newsroom_country_filter: {
    title: 'Country filter heading',
    defaultValue: 'Country',
    group: groups.newsroom,
  },
  newsroom_local_market_filter: {
    title: 'Local market filter heading',
    defaultValue: 'Local market',
    group: groups.newsroom,
    hidden: !Flags.IS_DEV,
  },
  newsroom_year_filter: {
    title: 'Year filter heading',
    defaultValue: 'Year',
    group: groups.newsroom,
  },
  newsroom_newslist_header: {
    title: 'News list heading',
    defaultValue: 'News',
    group: groups.newsroom,
  },
  newsroom_no_relevant_filters: {
    title: 'No options for a filter',
    defaultValue: 'No relevant content for this filter',
    group: groups.newsroom,
  },
  newsroom_no_hits: {
    title: 'No hits',
    defaultValue: 'Your search returned no results',
    group: groups.newsroom,
  },
  newsroom_related_links: {
    title: 'Related links',
    defaultValue: 'Related links',
    group: groups.newsroom,
  },
  newsroom_skip_to_news: {
    title: 'Skip to list of news',
    defaultValue: 'Skip to list of news',
    group: groups.newsroom,
  },
  magazineindex_list_header: {
    title: 'Magazine index: Stories list heading',
    defaultValue: 'Stories',
    group: groups.magazine,
  },
  magazine_tag_filter: {
    title: 'Magazine filter heading',
    defaultValue: 'Magazine Tag',
    group: groups.magazine,
  },
  magazine_tag_filter_all: {
    title: 'All',
    defaultValue: 'ALL',
    group: groups.magazine,
  },
  stock_nyse_time_delay_message: {
    title: 'Stock API: NYSE time delay message',
    defaultValue: 'at least 20 minutes delayed',
    group: groups.others,
    hidden: Flags.IS_SATELLITE,
  },
  footnotes: {
    title: 'Footnotes',
    defaultValue: 'Footnotes',
    group: groups.others,
  },
  footnote: {
    title: 'Footnote',
    defaultValue: 'Footnote',
    group: groups.others,
  },
  back_to_content: {
    title: 'Back to content',
    defaultValue: 'Back to content',
    group: groups.others,
  },
  close: {
    title: 'Close',
    defaultValue: 'Close',
    group: groups.others,
  },
  switch_to: {
    title: 'Switch to',
    defaultValue: 'Switch to',
    group: groups.others,
  },
  next: {
    title: 'Next',
    defaultValue: 'Next',
    group: groups.others,
  },
  previous: {
    title: 'Previous',
    defaultValue: 'Previous',
    group: groups.others,
  },
  page: {
    title: 'Page',
    defaultValue: 'Page',
    group: groups.others,
  },
  remove: {
    title: 'Remove',
    defaultValue: 'Remove',
    group: groups.others,
  },
  filter: {
    title: 'Filter',
    defaultValue: 'Filter',
    group: groups.others,
  },
  name: {
    title: 'Name',
    defaultValue: 'Name',
    group: groups.common,
  },
  email: {
    title: 'Email',
    defaultValue: 'Email',
    group: groups.common,
  },
  category: {
    title: 'Category',
    defaultValue: 'Category',
    group: groups.common,
  },
  name_validation: {
    title: 'Name validation',
    defaultValue: 'Please fill out your name',
    group: groups.common,
  },
  email_validation: {
    title: 'Email validation',
    defaultValue: 'Please fill out a valid email address',
    group: groups.common,
  },
  dont_enter_personal_info: {
    title: `Please don't enter any personal information`,
    defaultValue: `Please don't enter any personal information`,
    group: groups.common,
  },
  categories: {
    title: 'Categories',
    defaultValue: 'Categories',
    group: groups.common,
  },
  carousel_controls: {
    title: 'Carousel controls',
    defaultValue: 'Carousel controls',
    group: groups.carousel,
  },
  logolink_title: {
    title: 'Equinor logo link',
    defaultValue: 'Equinor homepage',
    group: groups.common,
  },
  featured_content: {
    title: 'Featured content',
    defaultValue: 'Featured content',
    group: groups.common,
  },
  local: {
    title: 'Local',
    defaultValue: 'Local',
    group: groups.common,
  },
  global: {
    title: 'Global',
    defaultValue: 'Global',
    group: groups.common,
  },
  carouselLiveAnnoucement: {
    title: 'Carousel live announcement',
    defaultValue: 'Showing item {x} of {carouselLength}',
    group: groups.common,
  },
  carouselItemCountLabel: {
    title: 'Carousel item count label',
    defaultValue: 'Item {x} of {carouselLength}',
    group: groups.common,
  },
  carouselPlay: {
    title: 'Play {titleOfCarousel} gallery',
    defaultValue: 'Play {title} gallery',
    group: groups.common,
  },
  carouselPause: {
    title: 'Pause {titleOfCarousel} gallery',
    defaultValue: 'Pause {title} gallery',
    group: groups.common,
  },
  readMore: {
    title: 'Read more',
    defaultValue: 'Read more',
    group: groups.others,
  },
  open: {
    title: 'Open',
    defaultValue: 'Open',
    group: groups.others,
  },
  internalLink: {
    title: 'Internal link',
    defaultValue: 'Internal link',
    group: groups.common,
  },
  externalLink: {
    title: 'External link',
    defaultValue: 'External link',
    group: groups.common,
  },
  downloadDocument: {
    title: 'Download document',
    defaultValue: 'Download document',
    group: groups.common,
  },
  search_page_title: {
    title: 'Search page title',
    defaultValue: 'Search',
    group: groups.search,
  },
}

type textSnippetGroup = { title: string; hidden?: boolean }
type textSnippet = Record<
  string,
  {
    title: string
    defaultValue: string
    hidden?: boolean
    group: textSnippetGroup
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
