/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client'

const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'

export const DATASET = client.clientConfig.dataset

export const IS_GLOBAL = DATASET === EQUINOR_COM_NAME || DATASET === EQUINOR_COM_DEV
