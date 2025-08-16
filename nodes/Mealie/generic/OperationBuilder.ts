import { IDisplayOptions, INodeProperties } from "n8n-workflow";

export function generateQueryFilterField(
  operationId?: string,
  resourceId?: string,
): INodeProperties[] {
  const displayOptions = prepareDisplayOptions(operationId, resourceId);
  return [
    {
      displayName: 'Query Filter',
      name: 'queryFilter',
      type: 'string',
      default: '',
      description: 'Query to filter results',
      displayOptions: displayOptions,
    },
  ]
}

export function generatePaginationFields(
  operationId?: string,
  resourceId?: string,
): INodeProperties[] {
  const displayOptions = prepareDisplayOptions(operationId, resourceId);
  return [
    {
      displayName: 'Pagination',
      name: 'pagination',
      placeholder: 'Add pagination parameters',
      type: 'fixedCollection',
      typeOptions: {
        multipleValues: false,
      },
      default: {},
      displayOptions: displayOptions,
      options: [
        {
          displayName: 'Pagination Fields',
          name: 'paginationFields',
          placeholder: 'Set pagination fields',
          values: [
            {
              displayName: 'Page',
              name: 'page',
              type: 'number',
              default: 1,
              required: true,
              description: 'Page number to retrieve',
            },
            {
              displayName: 'Per Page',
              name: 'perPage',
              type: 'number',
              default: 50,
              required: true,
              description: 'Number of items per page',
            },
            {
              displayName: 'Order By',
              name: 'orderBy',
              type: 'string',
              default: '',
              description: 'Field(s) to order by',
              hint: 'Comma-separated list of fields, with optional direction in the format: field1:asc,field2:desc.',
            },
            {
              displayName: 'Order Direction',
              name: 'orderDirection',
              type: 'options',
              options: [
                { name: 'Ascending', value: 'asc' },
                { name: 'Descending', value: 'desc' },
              ],
              default: 'asc',
              description: 'Direction to order results',
              hint: 'This field is ignored when Order By contains the order direction.',
            },
          ],
        },
      ],
    },
  ];
}

function prepareDisplayOptions(
  operationId?: string,
  resourceId?: string,
): IDisplayOptions {
  const displayOptions: IDisplayOptions = {
    show: {}
  };
  if (operationId) {
    displayOptions.show!.operation = [operationId];
  }
  if (resourceId) {
    displayOptions.show!.resource = [{
      _cnd: {
          eq: resourceId,
      }
    }];
  }
  return displayOptions;
}