import { authedFetch } from './request.js';

export { getPdfs };

function getPdfs(search) {
  const searchQuery = search
    .split(' ')
    .filter((s) => !!s)
    .map((s) => '*' + s + '*')
    .join(' ');

  return authedFetch(
    'pdf?filename=ilike.' + encodeURI(searchQuery) + '&limit=5'
  );
}
