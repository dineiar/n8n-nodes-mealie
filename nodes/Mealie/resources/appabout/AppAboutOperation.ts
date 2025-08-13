import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class AppAboutOperation {
  static readonly OperationId = 'getAppAbout';
  static readonly Operation: INodePropertyOptions = {
      name: 'Get Instance Information',
      value: AppAboutOperation.OperationId,
      action: 'Get instance information',
      description: 'Get app about',
      routing: {
          request: {
              method: 'GET',
              url: '/api/app/about',
          },
      },
  };

  static readonly Fields: INodeProperties[] = [];
}