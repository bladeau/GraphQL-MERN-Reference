const { gql } = require('apollo-server-express');
module.exports = {
  Query: {
    me: () => 'Ryan'
  }
};
