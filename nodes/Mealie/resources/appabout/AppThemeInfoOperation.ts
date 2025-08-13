import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class AppThemeOperation {
  static readonly OperationId = 'getAppTheme';
  static readonly Operation: INodePropertyOptions = {
      name: 'Get Instance Theme Information',
      value: AppThemeOperation.OperationId,
      action: 'Get instance theme information',
      description: 'Get app theme info',
      routing: {
          request: {
              method: 'GET',
              url: '/api/app/about/theme',
          },
      },
  };

  static readonly Fields: INodeProperties[] = [];
}