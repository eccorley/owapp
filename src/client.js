import App from "./components/App";
import BrowserRouter from "react-router-dom/BrowserRouter";
import React from "react";
import { hydrate } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:3000/graphql"
  }),
  cache: new InMemoryCache()
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
