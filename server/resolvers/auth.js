const { gql } = require('apollo-server-express');

const me = () => 'Ryan';

module.exports = {
  Query: {
    me
  }
};
