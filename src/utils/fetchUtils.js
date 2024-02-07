
// Example usage:
// const params = {
//   part: 'snippet',
//   q: 'your search query',
//   key: 'YOUR_API_KEY',
// }
export const generateQueryParams = (params) => {
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  return queryString;
}

// Used to decode back special characters in the yt response
export const decodeHtmlEntities = (title) => {
  const doc = new DOMParser().parseFromString(title, 'text/html');
  return doc.body.textContent;
}
