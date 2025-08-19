import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';
import { generatePaginationFields, generateQueryFilterField } from '../../generic/OperationBuilder';

export class GetAllGroupsOperation implements MealieN8nOperation {
  static readonly OperationId = 'getAllGroups';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get All Groups',
    value: GetAllGroupsOperation.OperationId,
    action: 'Get all groups',
    description: 'Get all groups in the system',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/groups',
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
    ...generateQueryFilterField(GetAllGroupsOperation.OperationId),
    ...generatePaginationFields(GetAllGroupsOperation.OperationId),
  ];
}
