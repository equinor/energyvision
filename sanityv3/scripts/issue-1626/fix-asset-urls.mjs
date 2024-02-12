//import { type SourceOptions } from 'sanity'
//import { getCliClient } from 'sanity/cli'
//import { sanityClient } from '../../sanity.client'
import { createClient } from '@sanity/client'

const dataset = 'global-development'
const client = createClient({
  apiVersion: apiVersion,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
  dataset: dataset,
})

const config = client.config()
/*
const client = getCliClient()
const config = client.config()

type ProjectDetails = Pick<SourceOptions, 'projectId' | 'dataset'>

interface AssetDocument {
  _id: string
  url: string
  path: string
}*/

/**
 * Ensures the required configuration properties are set.
 */
function isConfigValid(config) {
  return typeof config.projectId !== 'undefined' && typeof config.dataset !== 'undefined'
}

/**
 * Creates a function that transforms a path string (segments seperated by a `/`
 * character), replacing the `${projectId}/${dataset}` segments at the given
 * position with the given project details.
 */
function createFixFunction(position) {
  return (input, { projectId, dataset }) => {
    const input2 = input.split('/').slice() // create a copy of the array
    input2.splice(position, 2, projectId, dataset)
    return input2.join('/')
    //return input.split('/').toSpliced(position, 2, projectId, dataset).join('/')
  }
}

/**
 * Replaces the `${projectId}/${dataset}` segments in the given path.
 */
const fixPath = createFixFunction(1)

/**
 * Replaces the `${projectId}/${dataset}` segments in the given URL.
 */
const fixUrl = createFixFunction(4)

/**
 * Queries Sanity dataset for assets that have a `url` or `path` field that
 * doesn't match the provided project details.
 */
function fetchBrokenAssets({ projectId, dataset }) {
  return client.fetch(
    `
    *[
      _type in ["sanity.imageAsset", "sanity.fileAsset"]
      && (
        count(string::split(url, $expectedPath)) != 2
        || count(string::split(path, $expectedPath)) != 2
      )
    ] {
      _id,
      url,
      path
    }`,
    {
      expectedPath: `/${projectId}/${dataset}/`,
    },
  )
}

/**
 * Queries Sanity dataset for assets that have a `url` or `path` field that
 * doesn't match the provided project details, and patches them with fields
 * that do match.
 */
async function fixAssets(projectDetails) {
  const assets = await fetchBrokenAssets(projectDetails)

  const transaction = assets.reduce((transaction, asset) => {
    return transaction.patch(asset._id, (patch) =>
      patch.set({
        url: fixUrl(asset.url, projectDetails),
        path: fixPath(asset.path, projectDetails),
      }),
    )
  }, client.transaction())

  console.log(JSON.stringify(transaction))
  const result = await transaction.commit()

  console.log(`Fixed ${result.documentIds.length} documents.`)
  console.log(result.documentIds)
}

if (!isConfigValid(config)) {
  throw new Error('Please specify your project details.')
}

fixAssets(config)
