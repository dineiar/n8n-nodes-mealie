import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';
import { generatePaginationFields, generateQueryFilterField } from '../../generic/OperationBuilder';

export class GetAllUsersOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAllUsers';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get All Users',
    value: GetAllUsersOperation.OperationId,
    action: 'Get all users',
    description: 'Get all users with pagination support',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/users',
        qs: {
          page: '={{$parameter.pagination.paginationFields.page}}',
          perPage: '={{$parameter.pagination.paginationFields.perPage}}',
          orderBy: '={{$parameter.pagination.paginationFields.orderBy}}',
          orderDirection: '={{$parameter.pagination.paginationFields.orderDirection}}',
          queryFilter: '={{$parameter.queryFilter}}',
        },
      },
    },
  };

  static readonly Fields: INodeProperties[] = [
    ...generateQueryFilterField(GetAllUsersOperation.OperationId),
    ...generatePaginationFields(GetAllUsersOperation.OperationId),
  ];
}
