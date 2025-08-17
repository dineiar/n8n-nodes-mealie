import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  RegisterUserOperation,
  SelfFavoritesOperation,
  SelfOperation,
  SelfRatingsOperation,
  UpdatePasswordOperation,
  UpdateUserOperation,
} from "./usersCrud";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class UsersCrudResource implements MealieN8nResource {
  static readonly ResourceId = 'usersCrud';
  static readonly Resource: INodePropertyOptions = {
    name: 'Users: CRUD',
    value: UsersCrudResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [UsersCrudResource.ResourceId],
        },
      },
      options: [
        SelfOperation.Operation,
        SelfRatingsOperation.Operation,
        SelfFavoritesOperation.Operation,
        RegisterUserOperation.Operation,
        UpdatePasswordOperation.Operation,
        UpdateUserOperation.Operation,
      ],
      default: '',
    },
    ...SelfOperation.Fields,
    ...SelfRatingsOperation.Fields,
    ...SelfFavoritesOperation.Fields,
    ...RegisterUserOperation.Fields,
    ...UpdatePasswordOperation.Fields,
    ...UpdateUserOperation.Fields,
  ];
}
