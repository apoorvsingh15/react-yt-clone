
// useYoutubeSearch.js
import { useQuery } from 'react-query';
import { API_KEY, BASE_URL } from '../../data/credentials/constants';
import { generateQueryParams } from '../../utils/fetchUtils';

const fetchYoutubeSearchResults = async (params) => {
  const response = await fetch(
    `${BASE_URL}/search?${generateQueryParams(params)}&maxResults=${30}&key=${API_KEY}`
  ).then((res) => res.json());

  return response;
};

const useYoutubeSearch = (query) => {
  return useQuery(['youtubeSearch', query], () => fetchYoutubeSearchResults(query));
};

export default useYoutubeSearch;