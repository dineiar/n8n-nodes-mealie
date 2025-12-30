import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateRecipeFromHtmlOrJsonOperation implements MealieN8nOperation {
	static readonly OperationId = 'createRecipeFromHtmlOrJson';
	static readonly Operation: INodePropertyOptions = {
		name: 'Create Recipe from HTML or JSON',
		value: CreateRecipeFromHtmlOrJsonOperation.OperationId,
		action: 'Create a recipe from HTML or JSON-LD schema',
		description: 'Takes in raw HTML or a https://schema.org/Recipe object as a JSON string and parses it like a URL',
		routing: {
			request: {
				method: 'POST',
				url: '/api/recipes/create/html-or-json',
			},
			send: {
				preSend: [
					async function (this, requestOptions) {
						const advancedMode = this.getNodeParameter('advancedMode') as boolean;
						const includeTags = this.getNodeParameter('includeTags') as boolean;
						const url = this.getNodeParameter('url', '') as string;

						let data: string;

						if (advancedMode) {
							// Raw JSON mode - use the data directly
							data = this.getNodeParameter('rawJsonData') as string;
						} else {
							// Simple mode - build JSON-LD from individual fields
							const recipeName = this.getNodeParameter('recipeName') as string;
							const description = this.getNodeParameter('description', '') as string;
							const recipeCategory = this.getNodeParameter('recipeCategory', '') as string;
							const recipeCuisine = this.getNodeParameter('recipeCuisine', '') as string;
							const keywords = this.getNodeParameter('keywords', '') as string;
							const recipeYield = this.getNodeParameter('recipeYield', '') as string;
							const prepTime = this.getNodeParameter('prepTime', '') as string;
							const cookTime = this.getNodeParameter('cookTime', '') as string;
							const totalTime = this.getNodeParameter('totalTime', '') as string;
							const imageUrl = this.getNodeParameter('imageUrl', '') as string;

							// Get ingredients from fixedCollection
							const ingredientsData = this.getNodeParameter('ingredientsUi', {}) as {
								ingredientValues?: Array<{ ingredient: string }>;
							};
							const ingredients: string[] = ingredientsData.ingredientValues?.map(item => item.ingredient) || [];

							// Get instructions from fixedCollection
							const instructionsData = this.getNodeParameter('instructionsUi', {}) as {
								instructionValues?: Array<{ step: string }>;
							};
							const instructions = instructionsData.instructionValues?.map(item => ({
								'@type': 'HowToStep',
								text: item.step,
							})) || [];

							// Validate required fields
							if (ingredients.length === 0) {
								throw new Error('At least one ingredient is required to create a recipe');
							}

							if (instructions.length === 0) {
								throw new Error('At least one instruction step is required to create a recipe');
							}

							// Build JSON-LD object
							const jsonLd: Record<string, unknown> = {
								'@context': 'https://schema.org',
								'@type': 'Recipe',
								name: recipeName,
							};

							// Add optional fields only if they have values
							if (description) jsonLd.description = description;
							if (recipeCategory) jsonLd.recipeCategory = recipeCategory;
							if (recipeCuisine) jsonLd.recipeCuisine = recipeCuisine;
							if (keywords) jsonLd.keywords = keywords;
							if (recipeYield) jsonLd.recipeYield = recipeYield;
							if (prepTime) jsonLd.prepTime = prepTime;
							if (cookTime) jsonLd.cookTime = cookTime;
							if (totalTime) jsonLd.totalTime = totalTime;
							if (imageUrl) jsonLd.image = imageUrl;
							if (ingredients.length > 0) jsonLd.recipeIngredient = ingredients;
							if (instructions.length > 0) jsonLd.recipeInstructions = instructions;

							data = JSON.stringify(jsonLd);
						}

						// Build the request body
						const body: Record<string, unknown> = {
							data,
							includeTags,
						};

						if (url) {
							body.url = url;
						}

						requestOptions.body = body;
						return requestOptions;
					},
				],
			},
		},
	};

	static readonly Fields: INodeProperties[] = [
		// Advanced Mode Toggle
		{
			displayName: 'Advanced Mode',
			name: 'advancedMode',
			type: 'boolean',
			default: false,
			description: 'Whether to use raw JSON input instead of individual fields',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
				},
			},
		},

		// ============ SIMPLE MODE FIELDS ============

		{
			displayName: 'Recipe Name',
			name: 'recipeName',
			type: 'string',
			required: true,
			default: '',
			description: 'The name of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			typeOptions: {
				rows: 4,
			},
			default: '',
			description: 'A description of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Ingredients',
			name: 'ingredientsUi',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
				sortable: true,
			},
			default: {},
			placeholder: 'Add Ingredient',
			description: 'List of ingredients for the recipe. At least one ingredient is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
			options: [
				{
					name: 'ingredientValues',
					displayName: 'Ingredient',
					values: [
						{
							displayName: 'Ingredient',
							name: 'ingredient',
							type: 'string',
							default: '',
							placeholder: 'e.g., 2 cups flour',
							description: 'An ingredient with quantity and unit',
						},
					],
				},
			],
		},
		{
			displayName: 'Instructions',
			name: 'instructionsUi',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
				sortable: true,
			},
			default: {},
			placeholder: 'Add Step',
			description: 'Step-by-step instructions for the recipe. At least one step is required.',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
			options: [
				{
					name: 'instructionValues',
					displayName: 'Step',
					values: [
						{
							displayName: 'Step',
							name: 'step',
							type: 'string',
							typeOptions: {
								rows: 2,
							},
							default: '',
							placeholder: 'e.g., Preheat the oven to 350°F',
							description: 'A single instruction step',
						},
					],
				},
			],
		},
		{
			displayName: 'Category',
			name: 'recipeCategory',
			type: 'string',
			default: '',
			placeholder: 'e.g., Dessert, Main Course, Appetizer',
			description: 'The category of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Cuisine',
			name: 'recipeCuisine',
			type: 'string',
			default: '',
			placeholder: 'e.g., Italian, Mexican, Japanese',
			description: 'The cuisine type of the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Keywords',
			name: 'keywords',
			type: 'string',
			default: '',
			placeholder: 'e.g., quick, easy, vegetarian',
			description: 'Comma-separated keywords for the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Yield',
			name: 'recipeYield',
			type: 'string',
			default: '',
			placeholder: 'e.g., 4 servings, 1 loaf',
			description: 'The quantity produced by the recipe',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Prep Time',
			name: 'prepTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT15M (15 minutes)',
			description: 'Preparation time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Cook Time',
			name: 'cookTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT1H (1 hour)',
			description: 'Cooking time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Total Time',
			name: 'totalTime',
			type: 'string',
			default: '',
			placeholder: 'e.g., PT1H15M (1 hour 15 minutes)',
			description: 'Total time in ISO 8601 duration format (PT#H#M)',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},
		{
			displayName: 'Image URL',
			name: 'imageUrl',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/recipe-image.jpg',
			description: 'URL of the recipe image',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [false],
				},
			},
		},

		// ============ ADVANCED MODE FIELD ============

		{
			displayName: 'JSON-LD Data',
			name: 'rawJsonData',
			type: 'string',
			typeOptions: {
				rows: 15,
			},
			required: true,
			default: '',
			placeholder: '{"@context": "https://schema.org", "@type": "Recipe", "name": "My Recipe", ...}',
			description: 'Raw JSON-LD schema.org/Recipe data or HTML containing recipe markup',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
					advancedMode: [true],
				},
			},
		},

		// ============ COMMON FIELDS ============

		{
			displayName: 'Include Tags',
			name: 'includeTags',
			type: 'boolean',
			default: false,
			description: 'Whether to include tags from the parsed recipe data',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
				},
			},
		},
		{
			displayName: 'Source URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/original-recipe',
			description: 'Optional URL of the original recipe source',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
				},
			},
		},
	];
}
