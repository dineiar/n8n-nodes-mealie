import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  LoginOperation,
  LogoutOperation,
  OauthCallbackOperation,
  OauthLoginOperation,
  RefreshTokenOperation,
} from "./usersAuthentication";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class UsersAuthenticationResource implements MealieN8nResource {
  static readonly ResourceId = 'usersAuthentication';
  static readonly Resource: INodePropertyOptions = {
    name: 'Users: Authentication',
    value: UsersAuthenticationResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [UsersAuthenticationResource.ResourceId],
        },
      },
      options: [
        LoginOperation.Operation,
        LogoutOperation.Operation,
        RefreshTokenOperation.Operation,
        OauthCallbackOperation.Operation,
        OauthLoginOperation.Operation,
      ],
      default: '',
    },
    ...LoginOperation.Fields,
    ...LogoutOperation.Fields,
    ...RefreshTokenOperation.Fields,
    ...OauthCallbackOperation.Fields,
    ...OauthLoginOperation.Fields,
  ];
}
