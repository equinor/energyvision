const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      }),
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
    `,
  ).then((result) => {
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  return getArticles
}
