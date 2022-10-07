# TimerTrigger - TypeScript

The `TimerTrigger` makes it incredibly easy to have your functions executed on a schedule. This sample demonstrates a simple use case of calling your function every 5 minutes.

## How it works

For a `TimerTrigger` to work, you provide a schedule in the form of a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression)(See the link for full details). A cron expression is a string with 6 separate expressions which represent a given schedule via patterns. The pattern we use to represent every 5 minutes is `0 */5 * * * *`. This, in plain text, means: "When seconds is equal to 0, minutes is divisible by 5, for any hour, day of the month, month, day of the week, or year".

## Learn more

Index Sanity Content azure function is triggered for every 5 minutes by the Time Trigger function. So, algolia index is update-to-date with the content latest by 5 mins.

IndexSanityContent function fetches content from sanity and updates the index in Algolia. It accepts a POST request with the following body (for Norwegian nb-NO):
{ "language": "en-GB" }

Following are the indexes created:

### prod_NEWS_en-GB :

Corresponds to production data(English). News and local news are indexes are created under this index.
Page title, text, ingress, topicTags,countryTags, type, year, publishedDate time, slug are the contents for this index.

Local news and global news are indexed together to make both local news and global news searchable from the global search under the NEWS tab. This also makes it possible to filter only global news in the Newsroom page.

### prod_MAGAZINE_en-GB :

Corresponds to production data(English). Magazine content is indexed under this index.Page title,title,text, ingress, magazineTags, type, documentId and hero image are fetched and saved.

### prod_TOPICS_en-GB :

Corresponds to production data(English). Topic content is indexed under this index. Page Title, title , text, slug,ingress and type are the contents.

### prod_EVENTS_en-GB :

Corresponds to production data(English). Event content is indexed under this index. Title, slug,ingress and type, eventDescription and eventDate are the contents.

Norwegian contents are indexed under prod_NEWS_nb-NO, prod_EVENTS_nb-NO, prod_TOPICS_nb-NO and prod_MAGAZINE_nb-NO.

Please pay attention to the mapper.ts files under each folder. The mapper function maps sanity content to corresponding index field.
