import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateGroupOperation implements MealieN8nOperation {
  static readonly OperationId = 'createGroup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Create Group',
    value: CreateGroupOperation.OperationId,
    action: 'Create a new group',
    description: 'Create a new group',
    routing: {
      request: {
        method: 'POST',
        url: '/api/admin/groups',
        body: {
          name: '={{$parameter.name}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: true,
      default: '',
      description: 'The name of the group',
      displayOptions: {
        show: {
          operation: [CreateGroupOperation.OperationId],
        },
      },
    },
  ];
}
