const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers
} = require('merge-graphql-schemas');

const PORT = 8000;

//express server
const app = express();

// graphql server
// types query/ mutation / subscription
// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs'))); //Go to root directory, go to the typeDefs folder, load all the files merge them and make them available in typeDefs variable

// resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework i.e. express
apolloServer.applyMiddleware({ app: app });

// server
const httpserver = http.createServer(app);

//rest endpoint
app.get('/rest', (req, res) => {
  res.json({ data: 'you hit rest endpoint' });
});

// port
app.listen(PORT, () => {
  console.log(`server is ready at PORT:${PORT}`);
  console.log(
    `graphql server is ready at PORT:${PORT}.... ${apolloServer.graphqlPath}`
  );
});
