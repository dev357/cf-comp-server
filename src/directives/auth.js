import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { authenticate, checkRoles } from '../auth';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { roles } = this.args;

    field.resolve = function(root, args, context, info) {
      const auth = authenticate(context);
      const newContext = { ...context, auth };

      if (roles) checkRoles(newContext, roles);

      return resolve.call(this, root, args, newContext, info);
    };
  }
}

export default AuthDirective;
