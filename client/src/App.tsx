import { useMemo} from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, DefaultOptions } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route } from "react-router-dom";

import useAuthenticate from './hooks/useAuthenticate';
import Login from './components/auths/Login';
import Header from './layouts/BaseLayout/Header';
import Register from './components/auths/Register';
import Home from './layouts/Home';

import "./App.css";

function App() {
  const { token } = useAuthenticate();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URI ? `${process.env.REACT_APP_SERVER_URI}/graphql` : "http://localhost:8000/graphql"
  })

  const link = useMemo(() => setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }), [token]);

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const client = useMemo(() => new ApolloClient({
    link: link.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  }), [link]);

  return (
    <ApolloProvider client={client}>
      <Header />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </ApolloProvider>
  );
}
export default App;
