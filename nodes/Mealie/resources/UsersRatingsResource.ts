import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  GetFavoritesOperation,
  GetRatingsOperation,
} from "./usersRatings";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class UsersRatingsResource implements MealieN8nResource {
  static readonly ResourceId = 'usersRatings';
  static readonly Resource: INodePropertyOptions = {
    name: 'Users: Ratings',
    value: UsersRatingsResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [UsersRatingsResource.ResourceId],
        },
      },
      options: [
        GetRatingsOperation.Operation,
        GetFavoritesOperation.Operation,
      ],
      default: '',
    },
    ...GetRatingsOperation.Fields,
    ...GetFavoritesOperation.Fields,
  ];
}
