import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const ensureSignedIn = req => {
  console.log(`auth: ${req.headers.auth}`);
  console.log(`roles: ${req.headers.roles}`);
  if (req.headers.auth != true) {
    throw new AuthenticationError('You must be signed in');
  }
};

export const authenticate = context => {
  const authorization = context.req.get('Authorization');
  console.log(authorization);

  if (!authorization) throw new AuthenticationError('Not authorized!');

  const token = authorization.replace('Bearer ', '');

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(
        'Secret not provided, please provide "JWT_SECRET" with your token'
      );
    }

    return jwt.verify(token, secret);
  } catch (error) {
    throw new AuthenticationError('Invalid token!');
  }
};

export const checkRole = (context, requiredRoles) => {
  const userRoles = context.auth.role;

  if (!userRoles) {
    throw new Error(`Invalid token payload, missing role property`);
  }

  const hasNeededRole = requiredRoles.every(requiredRole =>
    userRoles
      .map(userRole => userRole.trim().toLowerCase())
      .includes(requiredRole.toLowerCase())
  );

  console.log({ userRoles, requiredRoles, hasNeededRole });

  if (!hasNeededRole) {
    throw new Error(
      `Must have role: ${requiredRoles}, you have role: ${userRoles}`
    );
  }
};
