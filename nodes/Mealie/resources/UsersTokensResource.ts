import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CreateApiTokenOperation,
  DeleteApiTokenOperation,
} from "./usersTokens";
import { MealieN8nResource } from "../generic/MealieN8nResource";


export class UsersTokensResource implements MealieN8nResource {
  static readonly ResourceId = 'usersTokens';
  static readonly Resource: INodePropertyOptions = {
    name: 'Users: Tokens',
    value: UsersTokensResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [UsersTokensResource.ResourceId],
        },
      },
      options: [
        CreateApiTokenOperation.Operation,
        DeleteApiTokenOperation.Operation,
      ],
      default: '',
    },
    ...CreateApiTokenOperation.Fields,
    ...DeleteApiTokenOperation.Fields,
  ];
}
