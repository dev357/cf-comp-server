import { AuthenticationError } from 'apollo-server-express';

export const ensureSignedIn = req => {
  console.log(`auth: ${req.headers.auth}`);
  console.log(`roles: ${req.headers.roles}`);
  if (req.headers.auth != true) {
    throw new AuthenticationError('You must be signed in');
  }
};
