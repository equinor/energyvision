# Sanity demo

Date: 2020.03.10

Present from Sanity: Jacob (Sales), Magnus (CEO), Rune (Engineer)


## General notes
- Sanity has about 30 000 users
- About 250 customers (amongst which Schibsted, TV2, Marathon Oil)
- largest office in Oslo, active in Norwegian market but expanding to the US
- Sanity does not call itself a headless CMS, but will happily be grouped into that group
- They want to provide the "google docs experience" where people can collaborate rather than having documents locked when
  someone is working on it
- Allegedly there is no other tool on the market like Sanity (in terms of architecture)
- Content API runs on their servers and cannot be self-hosted
- Sanity studio (the editor) is open-source and fully customizable
- Restaurant brands international runs on Sanity; has three brands (Popeyes, Burger King, Tim Hortons) and all content in webpages,
  apps, in-store kiosks and such run from one Sanity installation.
- Conde Nast uses Sanity in the UK for their "love magazine"
  - Uses a custom DAM
  - Uses a custom calendar component for scheduling releases
 

## Workflow between Sanity and customers
- Dedicated slack channel/team for technical support and advice - they can use other solutions as well but want to have a close,
  low-threshold communication channel
- Calls with solution engineers for introductions to new features, advice and guidance, and knowledge sharing
- Quarterly follow-up calls for feedback
- 5x 1 hour onboarding sessions with developers and editors
- Introduction to Sanity documentation, platform and support framework
- Support and guidance through slack during development
- Ad-hoc video calls for help and problem solving


## Editor workflow
- Can set focal points for images to focus on when cropping or resizing images
  - Live preview of different image sizes and crops
  - Master image remains untouched
- Can upload images from various different sources
- Allows for multiple users to edit the same content simultaneously in realtime.
- Custom workflows can be created, allowing for example for reviews before publishing.


## Technical notes
- Studio is very customizable
- Can have multiple studio installs using one backend
- Typically clients want to host the studio themselves, Sanity only hosts one studio per project
- Live preview should be available on self-hosted or on cloud hosted things (does this conflict with Gatsby 
- Can customize the content navigation in the studio
- Can create custom assets sources, from third-party sources like Unsplash, a DAM, a specific file system on an intranet, etc.
- Sanity doesn't handle video by itself, but has third-party integrations to allow for videos
- Can create various integrations such as adding YouTube videos, Instagram posts, etc.
- There is full custom access controls, you can set custom filters to for example allow person A to only edit articles where the
  title starts with "hello". These rules can be set for editing, viewing, accessing, etc.
- You can create custom workflows, for example restricting the system to only allow for creating drafts and then have a
  "request review" button instead of a "publish" button.
  - You can create for example a kanban board view for custom workflows.
- You can add additional steps to publishing, for example adding a "are you sure?" prompt, or showing a content analysis report
- You can add, for example, a tab in the editing view that shows data from google analytics - so that the editors can view
  these statistics for individual posts in the editor rather than having to log in to google analytics.
