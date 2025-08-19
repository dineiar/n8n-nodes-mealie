import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class UpdateGroupOperation implements MealieN8nOperation {
  static readonly OperationId = 'updateGroup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Update Group',
    value: UpdateGroupOperation.OperationId,
    action: 'Update a group',
    description: 'Update an existing group by their ID',
    routing: {
      request: {
        method: 'PUT',
        url: '=/api/admin/groups/{{$parameter.groupId}}',
        body: {
          id: '={{$parameter.groupId}}',
          name: '={{$parameter.name}}',
          preferences: '={{$parameter.preferences || undefined}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    {
      displayName: 'Group ID',
      name: 'groupId',
      type: 'string',
      required: true,
      default: '',
      description: 'The UUID of the group to update',
      displayOptions: {
        show: {
          operation: [UpdateGroupOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      required: true,
      default: '',
      description: 'The name of the group',
      displayOptions: {
        show: {
          operation: [UpdateGroupOperation.OperationId],
        },
      },
    },
    {
      displayName: 'Preferences',
      name: 'preferences',
      type: 'json',
      default: '',
      description: 'Group preferences as JSON object',
      displayOptions: {
        show: {
          operation: [UpdateGroupOperation.OperationId],
        },
      },
    },
  ];
}
