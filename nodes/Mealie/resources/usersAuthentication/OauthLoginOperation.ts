import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class OauthLoginOperation implements MealieN8nOperation {
  static readonly OperationId = 'oauthLogin';
  static readonly Operation: INodePropertyOptions = {
    name: 'OAuth Login',
    value: OauthLoginOperation.OperationId,
    action: 'Initiate OAuth login',
    description: 'Initiate OAuth login process',
    routing: {
      request: {
        method: 'GET',
        url: '/api/auth/oauth',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
