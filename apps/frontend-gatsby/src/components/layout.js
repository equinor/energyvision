/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { PageMenu } from './PageMenu'

import 'normalize.css'
import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query PageList {
      cms {
        pages {
          id
          slug
          name
        }
      }
    }
  `)

  return (
    <main className="wrapper">
      <nav className="side-menu">
        <Link to="/">
          <img
            src="https://eds-static.equinor.com/logo/equinor-logo-horizontal.svg#red"
            alt="Equinor"
            className="logo"
          />
        </Link>

        <PageMenu pages={data.cms.pages} />
      </nav>
      <div className="page-content">{children}</div>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
