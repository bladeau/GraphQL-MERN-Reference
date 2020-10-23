const { gql } = require('apollo-server-express');

const { posts } = require('../temp');

const totalPosts = () => posts.length;
const allPosts = () => posts;
module.exports = {
  Query: {
    totalPosts,
    allPosts
  }
};
