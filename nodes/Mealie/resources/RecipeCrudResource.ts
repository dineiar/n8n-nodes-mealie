import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import { CreateRecipe, CreateRecipeFromHtmlOrJsonOperation } from "./recipeCrud";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class RecipeCrudResource implements MealieN8nResource {
  static readonly ResourceId = 'recipeCrud';
  static readonly Resource: INodePropertyOptions = {
    name: 'Recipe: CRUD',
    value: RecipeCrudResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [RecipeCrudResource.ResourceId],
        },
      },
      options: [
        CreateRecipe.Operation,
        CreateRecipeFromHtmlOrJsonOperation.Operation,
      ],
      default: '',
    },
    ...CreateRecipe.Fields,
    ...CreateRecipeFromHtmlOrJsonOperation.Fields,
  ];
}
