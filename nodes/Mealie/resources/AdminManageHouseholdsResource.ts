import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CreateHouseholdOperation,
  DeleteHouseholdOperation,
  GetAllHouseholdsOperation,
  GetHouseholdOperation,
  UpdateHouseholdOperation,
} from "./adminManageHouseholds";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminManageHouseholdsResource implements MealieN8nResource {
  static readonly ResourceId = 'adminManageHouseholds';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Manage Households',
    value: AdminManageHouseholdsResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminManageHouseholdsResource.ResourceId],
        },
      },
      options: [
        GetAllHouseholdsOperation.Operation,
        CreateHouseholdOperation.Operation,
        GetHouseholdOperation.Operation,
        UpdateHouseholdOperation.Operation,
        DeleteHouseholdOperation.Operation,
      ],
      default: '',
    },
    ...GetAllHouseholdsOperation.Fields,
    ...CreateHouseholdOperation.Fields,
    ...GetHouseholdOperation.Fields,
    ...UpdateHouseholdOperation.Fields,
    ...DeleteHouseholdOperation.Fields,
  ];
}
