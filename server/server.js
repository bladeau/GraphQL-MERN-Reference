const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');

const PORT = 8000;

//express server
const app = express();

// graphql server
// types query/ mutation / subscription
const typeDefs = `
type Query{
  totalPosts: Int!
}
`;

// resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42
  }
};

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
