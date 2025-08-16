import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';
import { generatePaginationFields, generateQueryFilterField } from '../../generic/OperationBuilder';

export class GetAllHouseholdsOperation implements MealieN8nOperation {
  static readonly OperationId = 'adminGetAllHouseholds';
  static readonly Operation: INodePropertyOptions = {
    name: 'Get All Households',
    value: GetAllHouseholdsOperation.OperationId,
    action: 'Get all households',
    description: 'Get all households as admin',
    routing: {
      request: {
        method: 'GET',
        url: '/api/admin/households',
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
    ...generateQueryFilterField(GetAllHouseholdsOperation.OperationId),
    ...generatePaginationFields(GetAllHouseholdsOperation.OperationId),
  ];
}
