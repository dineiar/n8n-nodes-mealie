import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class LoginOperation implements MealieN8nOperation {
  static readonly OperationId = 'usersAuthenticationLogin';
  static readonly Operation: INodePropertyOptions = {
    name: 'Login',
    value: LoginOperation.OperationId,
    action: 'Login user',
    description: 'Get authentication token using username and password',
    routing: {
      request: {
        method: 'POST',
        url: '/api/auth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          username: '={{$parameter.username}}',
          password: '={{$parameter.password}}',
          remember_me: '={{$parameter.rememberMe}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Username',
      name: 'username',
      type: 'string',
      required: true,
      default: '',
      description: 'The username to authenticate with',
      displayOptions: {
        show: {
          operation: [LoginOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Password',
      name: 'password',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      default: '',
      description: 'The password to authenticate with',
      displayOptions: {
        show: {
          operation: [LoginOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Remember Me',
      name: 'rememberMe',
      type: 'boolean',
      default: false,
      description: 'Whether to remember the authentication',
      displayOptions: {
        show: {
          operation: [LoginOperation.OperationId],
        },
      },
    },
  ];
}
