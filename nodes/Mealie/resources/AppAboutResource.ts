import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  AppAboutOperation,
  AppStartupInfoOperation,
  AppThemeOperation,
} from "./appAbout";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AppAboutResource implements MealieN8nResource {
  static readonly ResourceId = 'appAbout';
  static readonly Resource: INodePropertyOptions = {
    name: 'App: About',
    value: AppAboutResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AppAboutResource.ResourceId],
        },
      },
      options: [
        AppAboutOperation.Operation,
        AppStartupInfoOperation.Operation,
        AppThemeOperation.Operation,
      ],
      default: '',
    },
    ...AppAboutOperation.Fields,
    ...AppStartupInfoOperation.Fields,
    ...AppThemeOperation.Fields,
  ];
}
