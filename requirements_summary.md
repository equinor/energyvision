This file summarize the requirements that came up while discussing the usage scenarios in the issues #1 to #13


## Content creation
The solution should support:
- creation of rich user experiences, with fine-grained control over elements in a page
- creation of custom forms, utilizing both custom and predefined fields
- creation and update of templates, and creation of pages starting from templates
- displaying a preview of the page before publishing it
- creation of global code snippets, reusable and automatically updated across the website 
- selection of assets (eg, pictures and videos) to include in a page, with easy customization of view (crop, scale, aspect ratio, etc)
- assigning values to metatags (title, description, open graph data) for both templates and pages


## Content modelling
The solution should support:
- defining categories of page content, without the intervention of developers
- definint custom text and numeric fields
- defining validation rules on various fields


## Workflow
The solution should support:
- displaying a confirmation prompt before publishing/modifying a page
- saving articles as drafts
- scheduling article publication at given data/time
- creation of drafts and pages with limited access (see _Access Control_ further down)
- creation of satellite websites, with custom access permission 


## Access control
The solution should support:
- defining users and their roles, where roles have specific customizable permissions
- giving guest access to external/temporary users
- revoke access to users
- associating users accounts to their Equinor identity
- limiting drafts and pages access to selected users/roles


## Asset management
The solution should support:
- management of various assets, such as videos, images, pdf documents
- search through the assets using different properties (filename, resolution, date of creation, etc)
- easy editing of basic properties of assets, such as size, scale, aspect ratio
- defining reference points in pictures for smart scaling/cropping
- possibly linking directly to Equinor's cloud-based image and video archive
  - the archives should be at least compatible, so that meta data is preserved when importing assets
- publishing an asset even though it's not referred to by any page
- unpublishing assets automatically when there is no page that links to it


## Localization
The solution should support:
- language selection, at least between Norwegian and English
- creation of the same page in multiple languages, with as little redundancy as possible
- creation of assets' attributes (caprions, tags, ...) in multiple languages


## Version history
The solution should support:
- revision history for pages, with date, time, username and summary of changes associated to every change
- revision history for assets, with date, time and username


## Collaboration
The solution should support:
- simultaneous access of multiple users
- as a minimum, blocking simultaneous editing of the same resource (page or asset) by mulyple users
- more advanced solutions for simultanous editing (nice to have, not required)


## Taxonomy
The solution should support:
- annotating assets and pages with tags
- gruping related assets and pages


## Analytics
The solution should support:
- analytics at both the page level (eg, which part of a page are visited more often)
- analytics at the entire website level (eg, which parts of the webiste are visted more often)


## Development process
The solution should support:
- accessing content through an API (REST/GraphQL, for develoers)
- exporting the database(s) with the website content and assets in a _common_ format
 

## Miscellaneous
The solution should support:
- accessibility standard, as defined by WCAG 2.1 (see also https://uu.difi.no/om-oss/english)
- highlighting accessibility issues while editing content
- compliance with GDPR
- ownership of data and content should be exclusively of Equinor
- hosting in countries outside US, UK or Australia due to laws regarding data/security/privacy in those countries
- subscription to a newsletter, with choice of topics
- WISIWIG editor for pages (nice to have)
