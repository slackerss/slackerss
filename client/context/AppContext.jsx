/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  const searchRecipes = ({ query }) => {
    axios
      .get('/search', { params: { query } })
      .then((response) => {
        console.log(response.data.hits);
        setSearchResults(response.data.hits);
      })
      .catch((err) => console.error(err));
  };
  const appProps = { searchRecipes, searchResults, setSearchResults };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}

export { AppContextProvider, AppContext };
