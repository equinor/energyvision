export const SCHEMA_TYPE = [
  `magazineIndex`,
  `magazine`,
  `localNews`,
  `news`,
  `newsroom`,
  `page`,
  `event`,
  `pageNotFound`,
  `internalServerError`,
  `landingPage`,
  `siteMenu`,
  `footer`,
]

export const testDocs = [
  '9cc573dc-ee9e-4980-8a5a-788952e1ccac',
  '0f45e2eb-4a01-40ed-ae98-e57997b14f1b__i18n_nb_NO',
  'drafts.0f45e2eb-4a01-40ed-ae98-e57997b14f1b',

  'drafts.77815ae5-8886-4ba8-80a4-2e47adc83859',
  'drafts.77815ae5-8886-4ba8-80a4-2e47adc83859__i18n_nb_NO',
]
/*export const testDocs = [
  'c98a0ff0-75a4-45c4-ba81-4b0d83967be5',
  '3deb2937-c3b6-47dc-8ead-88291a21103b',
  'c2110403-ddcb-4507-a3c4-8051eb7c1ddf',
  '4b0f6ab9-2775-4553-83b3-fd3f51e19e23',
  '16145b47-de59-47fd-a7d0-b7ec27f410b0__i18n_nb_NO',
  'c6077408-87bc-4512-a9bd-62ff99894894__i18n_nb_NO',
  '5a099c36-d1ae-4cf8-812a-4b5adbebac61__i18n_nb_NO',
  '01fbe898-9f55-45f8-959e-8c0652d359ee__i18n_nb_NO',
  'c6077408-87bc-4512-a9bd-62ff99894894',
  'c2110403-ddcb-4507-a3c4-8051eb7c1ddf__i18n_nb_NO',
  'c98a0ff0-75a4-45c4-ba81-4b0d83967be5__i18n_nb_NO',
  'drafts.3deb2937-c3b6-47dc-8ead-88291a21103b__i18n_nb_NO',
  '07cb4e46-5f0f-4cd7-8ba8-ca44b9a422c2__i18n_nb_NO',
  '07cb4e46-5f0f-4cd7-8ba8-ca44b9a422c2',
  'a1055196-853a-4393-97ad-501970a872db',
  'drafts.a1055196-853a-4393-97ad-501970a872db__i18n_nb_NO',
  'drafts.8077d418-1887-4048-8dae-21112791d671',
  '8077d418-1887-4048-8dae-21112791d671__i18n_nb_NO',
  'drafts.069c1c42-1348-4076-b034-a4db05b92b20',
  'drafts.069c1c42-1348-4076-b034-a4db05b92b20__i18n_nb_NO',

  /// local news docs
  'drafts.98fb4551-739c-472c-8d9f-8cd9900dedba__i18n_nb_NO',
  '98fb4551-739c-472c-8d9f-8cd9900dedba',
  'drafts.6074c82b-d79d-46ec-bf73-6a12a2b62c75',
  '6074c82b-d79d-46ec-bf73-6a12a2b62c75__i18n_nb_NO',
  'drafts.237157a8-8102-4894-9a5c-3a1d162388f8',
  'drafts.237157a8-8102-4894-9a5c-3a1d162388f8__i18n_nb_NO',
  '2b9476f1-0ee1-4d89-b7f2-c3cdb2fb1515',
  '2b9476f1-0ee1-4d89-b7f2-c3cdb2fb1515__i18n_nb_NO',
  '2be62b57-1bb2-47ca-8164-a52dec7e20c4__i18n_nb_NO',
  '2be62b57-1bb2-47ca-8164-a52dec7e20c4',
  '8ecd94d0-4daf-4b37-9dae-6d78d9f364e2',
  '8ecd94d0-4daf-4b37-9dae-6d78d9f364e2__i18n_nb_NO',
  'b0588b7d-5718-48c3-82f9-32d95a5c844d',
  'drafts.b0588b7d-5718-48c3-82f9-32d95a5c844d__i18n_nb_NO',
  'drafts.15f34827-0b69-4d4a-bf96-d512367a6a5f',
  '15f34827-0b69-4d4a-bf96-d512367a6a5f__i18n_nb_NO',
  'drafts.b2190b8c-83ae-43f0-9567-63ca9c357bc6',
  'drafts.b2190b8c-83ae-43f0-9567-63ca9c357bc6__i18n_nb_NO',

  // ---- magazine docs
  'e6eb0172-e56a-4448-aa7f-b9ca69f20d21__i18n_nb_NO',
  'e6eb0172-e56a-4448-aa7f-b9ca69f20d21',
  'drafts.a3c681d4-d16a-4246-91a0-7641c965b825__i18n_nb_NO',
  'drafts.a3c681d4-d16a-4246-91a0-7641c965b825',
  '5611dd46-f038-456b-8cb9-c4b9fcc7cc29',
  'drafts.5611dd46-f038-456b-8cb9-c4b9fcc7cc29__i18n_nb_NO',
  '752567b4-4807-4726-8ec6-c213013a876a',
  '752567b4-4807-4726-8ec6-c213013a876a__i18n_nb_NO',
  'a74d9d93-8312-4070-a59c-688eb12bc51f',
  'drafts.a74d9d93-8312-4070-a59c-688eb12bc51f__i18n_nb_NO',
  'drafts.77c8c458-588d-4949-afcd-1487201d61f9',
  '77c8c458-588d-4949-afcd-1487201d61f9__i18n_nb_NO',
  'drafts.5daf59b9-353d-416f-a016-bc9de5b3d5cc',
  'drafts.5daf59b9-353d-416f-a016-bc9de5b3d5cc__i18n_nb_NO',
  // event docs
  '9c2e1259-94b9-4b7f-adab-f913f8d25f7e__i18n_nb_NO',
  '9c2e1259-94b9-4b7f-adab-f913f8d25f7e',
  'drafts.d8aba411-222e-4cac-9629-e9ba3a455c6f',
  'drafts.d8aba411-222e-4cac-9629-e9ba3a455c6f__i18n_nb_NO',
  '6c8bcbf8-dcea-45df-8d06-734b7cf5814b',
  'drafts.6c8bcbf8-dcea-45df-8d06-734b7cf5814b__i18n_nb_NO',

  // magazine index
  'magazineIndex',
  'magazineIndex__i18n_nb_NO',

  // newsroom
  'newsroom',
  'newsroom__i18n_nb_NO',

  //internalServerError
  'internalServerError',
  'internalServerError__i18n_nb_NO',

  //pageNotFound
  'pageNotFound',
  'pageNotFound__i18n_nb_NO',

  // siteMenu
  'english-menu',
  'norwegian-menu',

  // footer
  'english-footer',
  'norwegian-footer',
]*/
