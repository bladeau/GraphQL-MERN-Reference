const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers
} = require('merge-graphql-schemas');

require('dotenv').config();

const PORT = 8000;

//express server
const app = express();

//db
const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('DB Connected');
  } catch (error) {
    console.log('DB Connection Error:', error);
  }
};

//execute database connection,
db();
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
