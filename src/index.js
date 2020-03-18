const { COLLECTIONS_DATA } = require("./data");
const { GraphQLServer } = require("graphql-yoga");
const { resources } = require("./connectors");
const fetch = require("node-fetch");

const resolvers = {
  Query: {
    test: () => `This is the test endpoint API for a simple application`,
    collections: () => COLLECTIONS_DATA,
    collection: (root, { id }) =>
      COLLECTIONS_DATA.find(collection => collection.id === id),
    getCollectionsByTitle: (root, { title }) =>
      COLLECTIONS_DATA.find(collection => collection.title === title),
    resources: () =>
      fetch(
        `https://my-json-server.typicode.com/MankalMR/tech-resource-finder/resources`
      ).then(res => res.json())
    // resources: () => resources().then(res => res.data)
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});

const serverOptions = {
  port: process.env.PORT || 4000,
  endpoint: "/graphql",
  playground: "/playground"
};
server.start(serverOptions, ({ endpoint }) =>
  console.log(`The server is running on ${endpoint}`)
);
