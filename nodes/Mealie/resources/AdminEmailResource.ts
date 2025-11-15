import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CheckEmailConfigOperation,
  SendTestEmailOperation,
} from "./adminEmail";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminEmailResource implements MealieN8nResource {
  static readonly ResourceId = 'adminEmail';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Email',
    value: AdminEmailResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminEmailResource.ResourceId],
        },
      },
      options: [
        CheckEmailConfigOperation.Operation,
        SendTestEmailOperation.Operation,
      ],
      default: '',
    },
    ...CheckEmailConfigOperation.Fields,
    ...SendTestEmailOperation.Fields,
  ];
}
