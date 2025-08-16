import { INodeType, INodeTypeDescription, NodeConnectionType } from "n8n-workflow";
import {
  AdminAboutResource,
  AdminBackupsResource,
  AdminManageHouseholdsResource,
  AdminManageUsersResource,
  AppAboutResource,
  GroupsHouseholdsResource,
  UsersCrudResource,
  UsersRatingsResource,
  UsersTokensResource,
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
        name: 'mealieNoAuthApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['noAuth'],
          },
        },
      },
      {
        name: 'mealieApiKeyApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['apiToken'],
          },
        },
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
        displayName: 'Authentication',
        name: 'authentication',
        type: 'options',
        options: [
          {
            name: 'No Authentication',
            value: 'noAuth',
          },
          {
            name: 'API Token',
            value: 'apiToken',
          },
        ],
        default: 'apiToken',
      },
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          AdminAboutResource.Resource,
          AdminBackupsResource.Resource,
          AdminManageHouseholdsResource.Resource,
          AdminManageUsersResource.Resource,
          AppAboutResource.Resource,
          GroupsHouseholdsResource.Resource,
          UsersCrudResource.Resource,
          UsersRatingsResource.Resource,
          UsersTokensResource.Resource,
        ],
        default: '',
        required: true,
      },
      ...AdminAboutResource.Operations,
      ...AdminBackupsResource.Operations,
      ...AdminManageHouseholdsResource.Operations,
      ...AdminManageUsersResource.Operations,
      ...AppAboutResource.Operations,
      ...GroupsHouseholdsResource.Operations,
      ...UsersCrudResource.Operations,
      ...UsersRatingsResource.Operations,
      ...UsersTokensResource.Operations,
    ],
  };
}
