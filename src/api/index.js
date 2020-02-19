import axios from 'axios'
import { CANCEL } from 'redux-saga';

const baseURL = 'https://deezerdevs-deezer.p.rapidapi.com/';

const headers = {
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  "x-rapidapi-key": "ad0557838fmshbde707ebbbd2a45p1b49aajsn8b211e53b7e8"
}

const baseRequest = axios.create({
  baseURL,
  headers
});

export const fetchSongsByArtist = url => {
  const source = axios.CancelToken.source();
  const request = baseRequest.get(`artist/${url}/top?limit=5`, { cancelToken: source.token });
  request[CANCEL] = () => source.cancel();
  return request;
};

export const fetchArtist = (query, cancelToken) => {
  const request = baseRequest.get(`search/artist/?q="${query}"`, { cancelToken });
  return request;
};

