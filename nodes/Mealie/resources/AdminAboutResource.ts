import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  AdminAppInfoOperation,
  AdminAppStatisticsOperation,
  AdminCheckAppConfigOperation,
} from "./adminAbout";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminAboutResource implements MealieN8nResource {
  static readonly ResourceId = 'adminAbout';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: About',
    value: AdminAboutResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminAboutResource.ResourceId],
        },
      },
      options: [
        AdminAppInfoOperation.Operation,
        AdminAppStatisticsOperation.Operation,
        AdminCheckAppConfigOperation.Operation,
      ],
      default: '',
    },
    ...AdminAppInfoOperation.Fields,
    ...AdminAppStatisticsOperation.Fields,
    ...AdminCheckAppConfigOperation.Fields,
  ];
}
