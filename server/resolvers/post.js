const { gql } = require('apollo-server-express');
module.exports = {
  Query: {
    totalPosts: () => 42
  }
};
