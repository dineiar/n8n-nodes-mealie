import { INodeType, INodeTypeDescription, NodeConnectionType } from "n8n-workflow";
import {
  AppAboutResource,
  UsersResource,
} from "./resources";

export class Mealie implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mealie',
    name: 'mealie',
    icon: 'file:mealie.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'Interact with Mealie API',
    defaults: {
      name: 'Mealie'
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
    credentials: [
      {
        name: 'mealieApiKeyApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          AppAboutResource.Resource,
          UsersResource.Resource,
        ],
        default: '',
        required: true,
      },
      ...AppAboutResource.Operations,
      ...UsersResource.Operations,
    ],
  };
}