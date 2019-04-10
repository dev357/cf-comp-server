const user = {
  id: 'test',
  email: 'test@test.com'
};

const users = [
  user,
  {
    id: 'aadu',
    email: 'aadu@lammas.ee'
  }
];

export default {
  Query: {
    me: (root, args, context, info) => {
      return user;
    },
    users: (root, args, context, info) => {
      return users;
    }
  },

  Mutation: {
    signUp: (root, args, req, info) => {
      return user;
    },
    signIn: (root, args, req, info) => {
      return user;
    },
    signOut: (root, args, req, info) => {
      return true;
    }
  }
};
