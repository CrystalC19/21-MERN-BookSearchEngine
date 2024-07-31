import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import './App.css';
//import { Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
 import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:"/graphql",
});

const authLink = setContext ((_,{ headers }) => {
  // get auth token from local storage if exisit
  const token = localStorage.getItem("id_token");
  //return headers to context so httplink can read them
  return {
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client= {client}>
      <Router>
    <>
    <Routes>
      <Route path="/" element={<SearchBooks />}/>
      <Route path= "/saved" element = {<SavedBooks />} />
      {/* Routes for unmatched paths*/}
      <Route path ="*" element= {<h1 className='display-2'>WrongPage!</h1>} />
    </Routes>
      <Navbar />
      <Outlet />
    </>
    </Router>
    </ApolloProvider>
  );
}

export default App;


// {/* <Switch>
// <Route exact path = "/" component = {SearchBooks} />
// <Route  exact path="/saved" component = {SavedBooks}/>
// <Route  render ={() => <h1 className='display-2'>WrongPage!</h1>}/>
// </Switch> */}