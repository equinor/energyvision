# Custom Hidden Fields Management for Sanity CMS

This project involves managing two custom hidden fields for `news`, `localNews`, and `magazine` documents in Sanity CMS:

- **`firstPublishedAt`**: Indicates the time the document was published for the first time.
- **`lastModifiedAt`**: Indicates the time when the document was last published with modifications.

## Webhook Mutation

To ensure these fields are updated correctly when using the scheduling feature, we use webhooks. The webhook performs the following actions upon document publication:

- Sets the `firstPublishedAt` field **if it is missing**.
- Sets the `lastModifiedAt` field upon any modification.

## Custom Document Action Mutation

### Unpublish Action

- **Objective**: To ensure that the `firstPublishedAt` field is set correctly upon the next publication.
- **Implementation**: The `CustomUnpublishAction` clears both the `firstPublishedAt` and `lastModifiedAt` fields when a document is unpublished.

### Duplicate Action

- **Objective**: To handle duplications of documents, particularly for base language documents.
- **Implementation**: The `CustomDuplicateAction` performs the following:
  - Checks if the document is in the base language.
  - Creates a duplicate of the document.
  - Unsets the `firstPublishedAt` and `lastModifiedAt` fields in the duplicated document.

## Summary

- **Webhook Mutation**:

  - Sets `firstPublishedAt` if it is missing.
  - Sets `lastModifiedAt` upon any modification.

- **Custom Document Actions**:
  - **Unpublish**: Clears both `firstPublishedAt` and `lastModifiedAt`.
  - **Duplicate**: Checks base language, duplicates the document, and unsets `firstPublishedAt` and `lastModifiedAt` in the duplicate.

This setup ensures the accurate tracking of the publication and modification times of your documents within Sanity CMS.
