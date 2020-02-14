const path = require(`path`)

const queries = {
  articles: `{ cms { articles { id slug } } }`,
}

const makeRequest = async (graphql, query) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(query).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }
        return result.data
      }),
    )
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const articles = await makeRequest(graphql, queries.articles)
  if (articles) {
    articles.cms.articles.forEach((article) => {
      createPage({
        path: `/news/${article.slug}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: article.id,
        },
      })
    })
  }
}
