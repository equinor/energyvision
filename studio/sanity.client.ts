import type { DatasetsKeys } from '@energyvision/shared/satelliteConfig';

export const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9';
export const dataset = (process.env.SANITY_STUDIO_API_DATASET ||
  'global-development') as DatasetsKeys;
export const apiVersion = 'v2023-12-06';
