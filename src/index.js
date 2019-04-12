import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, APP_PORT, NODE_ENV } = process.env;

const IN_PROD = NODE_ENV === 'production';

(async () => {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !IN_PROD,
      context: ({ req, res }) => ({ req, res })
    });

    server.applyMiddleware({ app });

    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true`,
      { useNewUrlParser: true, useCreateIndex: true }
    );

    await app.listen({ port: APP_PORT });
    console.log(
      `prod: ${IN_PROD} - http://localhost:${APP_PORT}${server.graphqlPath}`
    );
  } catch (error) {
    console.error(error);
  }
})();
