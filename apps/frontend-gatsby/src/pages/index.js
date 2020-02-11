import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { ArticleList } from '../components/ArticleList'

import indexStyle from './index.module.css'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    <section className={indexStyle.section}>
      <h2 className={indexStyle.title}>Latest News</h2>
      <ArticleList articles={data.allStrapiArticle.edges} />
    </section>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          slug
          title
          ingress
          body
          created_at
          image {
            childImageSharp {
              fixed(width: 350, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
