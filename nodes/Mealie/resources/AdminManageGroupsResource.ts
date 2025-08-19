import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CreateGroupOperation,
  DeleteGroupOperation,
  GetAllGroupsOperation,
  GetGroupOperation,
  UpdateGroupOperation,
} from "./adminManageGroups";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminManageGroupsResource implements MealieN8nResource {
  static readonly ResourceId = 'adminManageGroups';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Manage Groups',
    value: AdminManageGroupsResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminManageGroupsResource.ResourceId],
        },
      },
      options: [
        GetAllGroupsOperation.Operation,
        CreateGroupOperation.Operation,
        GetGroupOperation.Operation,
        UpdateGroupOperation.Operation,
        DeleteGroupOperation.Operation,
      ],
      default: '',
    },
    ...GetAllGroupsOperation.Fields,
    ...CreateGroupOperation.Fields,
    ...GetGroupOperation.Fields,
    ...UpdateGroupOperation.Fields,
    ...DeleteGroupOperation.Fields,
  ];
}
