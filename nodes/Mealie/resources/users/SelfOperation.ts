import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export class SelfOperation {
  static readonly OperationId = 'getUserSelf';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Logged User Information',
    value: SelfOperation.OperationId,
    action: 'Get logged user information',
    description: 'Get logged user info',
    routing: {
      request: {
        method: 'GET',
        url: '/api/users/self',
      },
    },
  };

  static readonly Fields: INodeProperties[] = [];
}