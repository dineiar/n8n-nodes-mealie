import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class DeleteGroupOperation implements MealieN8nOperation {
  static readonly OperationId = 'deleteGroup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Delete Group',
    value: DeleteGroupOperation.OperationId,
    action: 'Delete a group',
    description: 'Delete an existing group by their ID',
    routing: {
      request: {
        method: 'DELETE',
        url: '=/api/admin/groups/{{$parameter.groupId}}',
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
      description: 'The UUID of the group to delete',
      displayOptions: {
        show: {
          operation: [DeleteGroupOperation.OperationId],
        },
      },
    },
  ];
}
