const resolver = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => authors.find((author) => author.id === id),
  },

  Mutation: {
    upvotePost(_, { postId }) {
      const post = posts.find((post) => post.id === postId);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },

  Author: {
    posts: (author) => posts.filter((post) => post.authorId === author.id),
  },

  Post: {
    author: (post) => authors.find((author) => author.id === post.authorId),
  },
};

module.exports = resolver;
