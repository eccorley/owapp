import App from "./shared/App";
import bodyParser from "body-parser";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import costAnalysis from "graphql-cost-analysis";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import { loadSchema } from "./graphql/schema";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const graphQLSchema = loadSchema();

const costAnalyzer = costAnalysis({
  maximumCost: 1000,
  onComplete: cost => {
    console.log("Query cost", cost);
  }
});

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema: graphQLSchema,
      validationRules: [costAnalyzer]
    })
  )
  .get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))
  .get("/*", (req, res) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: new SchemaLink({ schema: loadSchema() }),
      cache: new InMemoryCache()
    });
    const context = {};
    const app = (
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(app)
      .then(() => {
        const markup = renderToString(app);
        const initialState = client.extract();
        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(200).send(
            `<!doctype html>
            <html lang="">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>Welcome to Razzle</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Roboto+Condensed:400i" rel="stylesheet">
                ${
                  assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ""
                }
                ${
                  process.env.NODE_ENV === "production"
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${
                        assets.client.js
                      }" defer crossorigin></script>`
                }
            </head>
            <body>
                <div id="root">${markup}</div>
                <script>window.__APOLLO_STATE__=${JSON.stringify(
                  initialState
                ).replace(/</g, "\\u003c")}</script>
            </body>
          </html>`
          );
        }
      })
      .catch(err => console.log(err));
  });

export default server;
