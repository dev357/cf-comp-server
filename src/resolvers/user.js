export const user = {
  id: 'test',
  email: 'test@test.com',
  roles: ['admin', 'user']
};

const aadu = {
  id: 'aadu',
  email: 'aadu@lammas.ee'
};

const users = [user, aadu];

export default {
  Query: {
    me: (root, args, context, info) => {
      return user;
    },
    users: (root, args, context, info) => {
      return users;
    },
    greet: (root, args, context, info) => {
      const name = args.name || 'dude';
      return `greetings ${name}`;
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
