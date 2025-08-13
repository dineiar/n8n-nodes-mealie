import {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MealieApiTokenApi implements ICredentialType {
  name = 'mealieApiKeyApi';
  displayName = 'Mealie API Token API';
  icon: Icon = 'file:mealie.svg';
  documentationUrl = 'https://docs.mealie.io/documentation/getting-started/api-usage/';
  properties: INodeProperties[] = [
    {
      displayName: 'Mealie Base URL',
      description: 'The base URL of your Mealie instance, e.g., http://<your-mealie-site>/',
      name: 'baseUrl',
      type: 'string',
      default: 'https://demo.mealie.io/',
    },
    {
      displayName: 'API Token',
      name: 'apiToken',
      type: 'string',
      default: '',
      typeOptions: {
        password: true,
      }
    },
  ];

  // This allows the credential to be used by other parts of n8n
  // stating how this credential is injected as part of the request
  // An example is the Http Request node that can make generic calls
  // reusing this credential
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '={{"Bearer " + $credentials.apiToken}}',
      },
    },
  };

  // The block below tells how this credential can be tested
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.baseUrl}}',
      url: '/api/users/self',
    },
  };
}
