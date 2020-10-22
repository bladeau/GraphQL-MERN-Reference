const { ApolloServer } = require('apollo-server');

require('dotenv').config();

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

// port
apolloServer.listen(process.env.PORT, () =>
  console.log(`graphql server is ready at PORT:${process.env.PORT}`)
);
