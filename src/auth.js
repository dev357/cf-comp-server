import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import { User } from './models';

const { JWT_SECRET } = process.env;

export const generateToken = user => {
  console.log({
    id: user.id,
    roles: user.roles
  });
  return jwt.sign(
    {
      id: user.id,
      roles: user.roles
    },
    JWT_SECRET,
    { expiresIn: '20h' }
  );
};

export const authenticate = context => {
  const authorization = context.req.get('Authorization');
  // console.log(authorization);

  if (!authorization) throw new AuthenticationError('Not authorized!');

  const token = authorization.replace('Bearer ', '');

  try {
    if (!JWT_SECRET) {
      throw new Error(
        'Secret not provided, please provide "JWT_SECRET" with your token'
      );
    }

    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AuthenticationError('Invalid token!');
  }
};

export const checkRoles = (context, requiredRoles) => {
  const userRoles = context.auth.roles;

  if (!userRoles) {
    throw new Error(`Invalid token payload, missing role property`);
  }

  const hasNeededRole = requiredRoles.every(requiredRole =>
    userRoles
      .map(userRole => userRole.trim().toLowerCase())
      .includes(requiredRole.toLowerCase())
  );

  // console.log({ userRoles, requiredRoles, hasNeededRole });

  if (!hasNeededRole) {
    throw new Error(
      `Must have role: ${requiredRoles}, you have role: ${userRoles}`
    );
  }
};

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.';
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError(message);
  }

  if (!(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }

  return user;
};
