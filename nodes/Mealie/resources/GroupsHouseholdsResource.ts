import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import {
  GetAllHouseholdsOperation,
  GetHouseholdOperation,
} from './groupsHouseholds';
import { MealieN8nResource } from '../generic/MealieN8nResource';

export class GroupsHouseholdsResource implements MealieN8nResource {
  static readonly ResourceId = 'groupsHouseholds';
  static readonly Resource: INodePropertyOptions = {
    name: 'Groups: Households',
    value: GroupsHouseholdsResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [GroupsHouseholdsResource.ResourceId],
        },
      },
      options: [
        GetAllHouseholdsOperation.Operation,
        GetHouseholdOperation.Operation,
      ],
      default: '',
    },
    ...GetAllHouseholdsOperation.Fields,
    ...GetHouseholdOperation.Fields,
  ];
}
