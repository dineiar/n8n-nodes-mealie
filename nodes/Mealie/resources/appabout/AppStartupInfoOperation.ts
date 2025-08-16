import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class AppStartupInfoOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAppStartupInfo';
  static readonly Operation: INodePropertyOptions = {
      name: 'Get Instance Startup Information',
      value: AppStartupInfoOperation.OperationId,
      action: 'Get instance startup information',
      description: 'Get app startup info',
      routing: {
          request: {
              method: 'GET',
              url: '/api/app/about/startup-info',
          },
      },
  };

  static readonly Fields: INodeProperties[] = [];
}