import { User } from '../models';
import { attemptSignIn, generateToken } from '../auth';

export default {
  Query: {
    me: (root, args, context, info) => {
      return User.findById(context.auth.id);
    },
    users: (root, args, context, info) => {
      return User.find();
    },
    greet: () => {
      return 'greetings';
    }
  },

  Mutation: {
    signUp: async (root, args, context, info) => {
      const user = await User.create({ ...args, roles: [] });
      return generateToken(user);
    },
    signIn: async (root, args, context, info) => {
      const user = await attemptSignIn(args.email, args.password);
      return generateToken(user);
    },
    signOut: (root, args, context, info) => {
      // Not required with JWT
      return true;
    }
  }
};
