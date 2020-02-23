import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { DynamicSection } from '../components/DynamicSection'

const PageTemplate = ({ data }) => {
  const page = data.cms.page

  return (
    <Layout>
      <SEO title={page.name} />

      <section>
        {page.sections ? <DynamicSection sections={page.sections} /> : null}
      </section>
    </Layout>
  )
}

export const query = graphql`
  fragment ComponentSectionsHero on strapi_ComponentSectionsHero {
    id
    title
    subtitle
    image {
      url
    }
  }
  fragment ComponentSectionsText on strapi_ComponentSectionsText {
    id
    heading
    content
  }
  fragment ComponentSectionsImage on strapi_ComponentSectionsImage {
    id
    image {
      url
    }
    caption
    alt
    type
  }

  query($id: ID!) {
    cms {
      page(id: $id) {
        id
        name
        sections {
          __typename
          ...ComponentSectionsImage
          ...ComponentSectionsHero
          ...ComponentSectionsText
        }
      }
    }
  }
`

export default PageTemplate
