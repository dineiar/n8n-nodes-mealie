import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  GetFavoritesOperation,
  GetRatingsOperation,
  SelfFavoritesOperation,
  SelfOperation,
  SelfRatingsOperation,
} from "./users";

export class UsersResource {
  static readonly ResourceId = 'users';
  static readonly Resource: INodePropertyOptions = {
    name: 'Users',
    value: UsersResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [UsersResource.ResourceId],
        },
      },
      options: [
        GetRatingsOperation.Operation,
        GetFavoritesOperation.Operation,
        SelfOperation.Operation,
        SelfRatingsOperation.Operation,
        SelfFavoritesOperation.Operation,
      ],
      default: '',
    },
    ...GetRatingsOperation.Fields,
    ...GetFavoritesOperation.Fields,
    ...SelfOperation.Fields,
    ...SelfRatingsOperation.Fields,
    ...SelfFavoritesOperation.Fields,
  ];
}
