import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CleanImagesOperation,
  CleanRecipeFoldersOperation,
  CleanTempOperation,
  DebugOpenAIOperation,
  GetMaintenanceInfoOperation,
  GetStorageInfoOperation,
} from "./adminMaintenance";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class AdminMaintenanceResource implements MealieN8nResource {
  static readonly ResourceId = 'adminMaintenance';
  static readonly Resource: INodePropertyOptions = {
    name: 'Admin: Maintenance',
    value: AdminMaintenanceResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [AdminMaintenanceResource.ResourceId],
        },
      },
      options: [
        GetMaintenanceInfoOperation.Operation,
        GetStorageInfoOperation.Operation,
        CleanImagesOperation.Operation,
        CleanTempOperation.Operation,
        CleanRecipeFoldersOperation.Operation,
        DebugOpenAIOperation.Operation,
      ],
      default: '',
    },
    ...GetMaintenanceInfoOperation.Fields,
    ...GetStorageInfoOperation.Fields,
    ...CleanImagesOperation.Fields,
    ...CleanTempOperation.Fields,
    ...CleanRecipeFoldersOperation.Fields,
    ...DebugOpenAIOperation.Fields,
  ];
}
