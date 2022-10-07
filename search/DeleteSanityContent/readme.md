## Intro

Index Sanity Content azure function is triggered for every 5 minutes by the Time Trigger function. So, algolia index is updated.

Delete Sanity Content function is triggered by Sanity webhook api when one of the following occurs:

1. When "Disable from search results" option is turned on for a document.
2. When a document ( excluding the one with 'disable from search results' option turned on) is deleted or unpublished.

[Two webhooks](https://www.sanity.io/organizations/oA7CAj32v/project/h61q9gi9/api) are set up in sanity to trigger the function when the above conditions are met.

The function accepts POST request with the following body:
{
"language" : `ISO language code of the document to be deleted for example : en-GB`,
"slug": `Slug to be deleted for example : /energy/sustainability`,
"index": `One of TOPICS,NEWS,MAGAZINE,EVENTS`
}
