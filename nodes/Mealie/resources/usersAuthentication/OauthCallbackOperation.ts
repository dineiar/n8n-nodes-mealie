import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class OauthCallbackOperation implements MealieN8nOperation {
  static readonly OperationId = 'oauthCallback';
  static readonly Operation: INodePropertyOptions = {
    name: 'OAuth Callback',
    value: OauthCallbackOperation.OperationId,
    action: 'Handle OAuth callback',
    description: 'Handle OAuth callback from provider',
    routing: {
      request: {
        method: 'GET',
        url: '/api/auth/oauth/callback',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}
