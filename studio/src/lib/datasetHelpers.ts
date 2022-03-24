/* eslint-disable import/no-unresolved */
import client from 'part:@sanity/base/client'

const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'

export const DATASET = client.clientConfig.dataset

export const IS_GLOBAL = DATASET === EQUINOR_COM_NAME || DATASET === EQUINOR_COM_DEV

/*
 * Used to hide documents in 'Create New Document' shortcut in the top bar
 * Proper permissions need to be handled at https://www.sanity.io/organizations/oA7CAj32v/project/h61q9gi9/access/resources
 */
export const HIDDEN_TYPES = !IS_GLOBAL ? ['simpleMenu'] : ['localNews', 'localNewsTag', 'landingPage']
