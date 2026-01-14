import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { MealieN8nOperation } from '../../generic/MealieN8nOperation';

export class CreateRecipeFromHtmlOrJsonOperation implements MealieN8nOperation {
	static readonly OperationId = 'createRecipeFromHtmlOrJson';
	static readonly Operation: INodePropertyOptions = {
		name: 'Create Recipe From HTML or JSON',
		value: CreateRecipeFromHtmlOrJsonOperation.OperationId,
		action: 'Create a recipe from HTML or JSON-LD schema',
		description: 'Takes in raw HTML or a https://schema.org/Recipe object as a JSON string and parses it like a URL',
		routing: {
			request: {
				method: 'POST',
				url: '/api/recipes/create/html-or-json',
			},
			output: {
				postReceive: [
					async function (this, items) {
						// Get the parseOutput option (default to true)
						const additionalOptions = this.getNodeParameter('additionalOptions', {}) as {
							parseOutput?: boolean;
						};
						const parseOutput = additionalOptions.parseOutput ?? true;

						if (!parseOutput) {
							// Return raw response if parseOutput is disabled
							return items;
						}

						// Transform the response to have a slug key
						return items.map((item) => {
							let slug;
							
							// Handle different response formats
							if (typeof item.json === 'string') {
								// Direct string response
								slug = item.json;
							} else if (Array.isArray(item.json)) {
								// Array response
								slug = item.json[0];
							} else if (item.json && typeof item.json === 'object') {
								// Already an object, might already have slug
								slug = item.json.slug || item.json;
							} else {
								slug = item.json;
							}

							return {
								json: {
									slug: slug,
								},
								pairedItem: item.pairedItem,
							};
						});
					},
				],
			},
			send: {
				preSend: [
					async function (this, requestOptions) {
						// Get additional options
						const additionalOptions = this.getNodeParameter('additionalOptions', {}) as {
							includeTags?: boolean;
							url?: string;
						};
						const includeTags = additionalOptions.includeTags ?? true;
						const url = additionalOptions.url ?? '';

						// Raw JSON mode - use the data directly
						const data = this.getNodeParameter('rawJsonOrHtmlData') as string;

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
		// ============ ADVANCED MODE FIELD ============

		{
			displayName: 'JSON-LD or HTML Data',
			name: 'rawJsonOrHtmlData',
			type: 'string',
			typeOptions: {
				rows: 15,
			},
			required: true,
			default: '',
			placeholder: '{"@context": "https://schema.org", "@type": "Recipe", "name": "My Recipe", ...}\nor\n<html>...recipe markup...</html>',
			description: 'Raw JSON-LD schema.org/Recipe data or HTML containing recipe markup',
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
				},
			},
		},

		// ============ COMMON FIELDS ============

		{
			displayName: 'Additional Options',
			name: 'additionalOptions',
			type: 'collection',
			placeholder: 'Show Additional Options',
			default: {},
			displayOptions: {
				show: {
					operation: [CreateRecipeFromHtmlOrJsonOperation.OperationId],
				},
			},
			options: [
				{
					displayName: 'Include Tags',
					name: 'includeTags',
					type: 'boolean',
					default: true,
					description: 'Whether to include tags from the parsed recipe data',
				},
				{
					displayName: 'Source URL',
					name: 'url',
					type: 'string',
					default: '',
					placeholder: 'https://example.com/original-recipe',
					description: 'Optional URL of the original recipe source',
				},
				{
					displayName: 'Parse Output',
					name: 'parseOutput',
					type: 'boolean',
					default: true,
					description: 'Whether to parse the response array into a structured object with "slug" key. If disabled, returns the raw array response from the API.',
				},
			],
		},
	];
}