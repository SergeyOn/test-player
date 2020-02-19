import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { debounce } from 'throttle-debounce';
import { FETCH_TRACKS_REQUEST } from 'store/types';

import { fetchArtist } from 'api';

const SearchForm = () => {

  const dispatch = useDispatch();

  const [state, setState] = useState({
    query: '',
    suggestions: []
  });

  const hadleChange = debounce(600, query => {   
    setState(state => ({
      ...state,
      query
    }))
  });

  useEffect(() => {
    let source = axios.CancelToken.source();
    const loadData = async (url) => {
      try{
        const response = await fetchArtist(state.query, source.token)
        const suggestions = response.data.data.map(({name, id}) => ({name, id}));
        setState(state => ({
          ...state,
          suggestions
        }));
      } catch (err) {}
    };
    if (state.query) {
      loadData();      
    }

    return () => {
      source.cancel();
      hadleChange.cancel();
    }
  }, [state.query])

  const handleClick = id => {
    dispatch({type: FETCH_TRACKS_REQUEST, payload: id})
  }

  return (
    <div>
      <input type="text" placeholder="search artist" onChange={(e) => hadleChange(e.target.value)}/>
      <ul>
        {state.suggestions.map(({name, id}) => <li style={{cursor: 'pointer'}} onClick={() => {handleClick(id)}}>{name}</li>)}
      </ul>
    </div>
  )
}

export default SearchForm;
