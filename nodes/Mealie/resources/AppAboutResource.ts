import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { AppAboutOperation, AppStartupInfoOperation, AppThemeOperation } from "./appabout";

export class AppAboutResource {
  static readonly ResourceId = 'appAbout';
  static readonly Resource: INodePropertyOptions = {
    name: 'App About',
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
