import { getStore } from '@netlify/blobs';

const STORE_NAME = 'produtos';

export function getUploadStore() {
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

export function isNetlifyRuntime() {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_DEV);
}
