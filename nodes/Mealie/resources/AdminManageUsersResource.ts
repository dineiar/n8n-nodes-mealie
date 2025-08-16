import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CreateUserOperation,
  DeleteUserOperation,
  GeneratePasswordResetTokenOperation,
  GetAllUsersOperation,
  GetUserOperation,
  UnlockUsersOperation,
  UpdateUserOperation,
} from "./adminManageUsers";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminManageUsersResource implements MealieN8nResource {
  static readonly ResourceId = 'adminUsers';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Manage Users',
    value: AdminManageUsersResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminManageUsersResource.ResourceId],
        },
      },
      options: [
        GetAllUsersOperation.Operation,
        CreateUserOperation.Operation,
        GetUserOperation.Operation,
        UpdateUserOperation.Operation,
        DeleteUserOperation.Operation,
        UnlockUsersOperation.Operation,
        GeneratePasswordResetTokenOperation.Operation,
      ],
      default: '',
    },
    ...GetAllUsersOperation.Fields,
    ...CreateUserOperation.Fields,
    ...GetUserOperation.Fields,
    ...UpdateUserOperation.Fields,
    ...DeleteUserOperation.Fields,
    ...UnlockUsersOperation.Fields,
    ...GeneratePasswordResetTokenOperation.Fields,
  ];
}
