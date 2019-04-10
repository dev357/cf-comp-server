import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { authenticate, checkRole } from '../auth';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { roles } = this.args;

    field.resolve = function(root, args, context, info) {
      console.log('Authdirective');

      const auth = authenticate(context);
      const newContext = { ...context, auth };

      checkRole(newContext, roles);

      return resolve.apply(this, root, args, { ...context, auth }, info);
    };
  }
}

export default AuthDirective;
