/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import axios from 'axios';
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loggedRecipeCal, setLoggedRecipeCal] = useState(0);

  const searchRecipes = ({ query }) => {
    axios
      .get('/search', { params: { query } })
      .then((response) => {
        console.log(response.data.hits);
        setSearchResults(response.data.hits);
      })
      .catch((err) => console.error(err));
  };

  const saveRecipe = (recipe) => {
    axios
      .post('/search/save', recipe)
      .then((response) => {
        console.log(response, 'recipe saved');
        setSavedRecipes(response);
      })
      .catch((err) => console.error(err));
  };

  // const getLoggedRecipe = () => {
  //   axios.get(`/myrecipes/${savedRecipe._id}`)
  //     .then(({data}) => {
  //       console.log(Math.round(data[0].calories));
  //       // setLoggedRecipeCal(loggedRecipeCal += (Math.round(data[0].calories)));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  const appProps = {
    searchRecipes,
    searchResults,
    setSearchResults,
    savedRecipes,
    setSavedRecipes,
    saveRecipe,
    // getLoggedRecipe,
    // loggedRecipeCal,
    // setLoggedRecipeCal
  };
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
}

export { AppContextProvider, AppContext };
