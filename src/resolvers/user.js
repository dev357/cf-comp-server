import jwt from 'jsonwebtoken';

export const user = {
  id: 'test',
  email: 'test@test.com',
  roles: ['admin', 'user'],
  password: 'test'
};

const aadu = {
  id: 'aadu',
  email: 'aadu@lammas.ee',
  password: 'aadu'
};

const users = [user, aadu];

const { JWT_SECRET } = process.env;

const generateToken = () => {
  return jwt.sign(
    {
      id: 'test',
      role: ['ADMIN', 'USER']
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

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
      console.log('signup');
      return generateToken();
    },
    signIn: (root, args, req, info) => {
      return generateToken();
    },
    signOut: (root, args, req, info) => {
      return true;
    }
  }
};
