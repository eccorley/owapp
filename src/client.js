import App from "./shared/App";
import BrowserRouter from "react-router-dom/BrowserRouter";
import React from "react";
import ScrollToTop from "./shared/ScrollToTop";
import { hydrate } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const cache = new InMemoryCache({
  addTypename: true,
  cacheResolvers: {}
});

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:3000/graphql",
    credentials: "same-origin"
  }),
  cache: cache.restore(window.__APOLLO_STATE__),
  ssrMode: true,
  ssrForceFetchDelay: 100,
  connectToDevTools: true,
  queryDeduplication: true
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
