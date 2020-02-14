import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { ArticleList } from '../components/ArticleList'

import indexStyle from './index.module.css'

const IndexPage = ({ data }) => {
  const articles = data.cms.articles
  return (
    <Layout>
      <SEO title="Home" />

      <section className={indexStyle.section}>
        <h2 className={indexStyle.title}>Latest News</h2>
        <ArticleList articles={articles} />
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    cms {
      articles {
        id
        slug
        title
        ingress
        body
        created_at
        image {
          url
        }
      }
    }
  }
`
