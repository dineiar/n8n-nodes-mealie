import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class GetGroupOperation implements MealieN8nOperation {
  static readonly OperationId = 'getGroup';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get Group',
    value: GetGroupOperation.OperationId,
    action: 'Get a group by ID',
    description: 'Get a single group by their ID',
    routing: {
      request: {
        method: 'GET',
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
      description: 'The UUID of the group to retrieve',
      displayOptions: {
        show: {
          operation: [GetGroupOperation.OperationId],
        },
      },
    },
  ];
}
