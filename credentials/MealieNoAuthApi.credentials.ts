import {
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MealieNoAuthApi implements ICredentialType {
  name = 'mealieNoAuthApi';
  displayName = 'Mealie No Auth API';
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
  ];

  // The block below tells how this credential can be tested
  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials?.baseUrl}}',
      url: '/api/app/about',
    },
  };
}
