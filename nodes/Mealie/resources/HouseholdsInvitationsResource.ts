import { INodeProperties, INodePropertyOptions } from "n8n-workflow";
import {
  CreateInviteTokenOperation,
  EmailInvitationOperation,
  GetInviteTokensOperation,
} from "./householdsInvitations";
import { MealieN8nResource } from "../generic/MealieN8nResource";

export class HouseholdsInvitationsResource implements MealieN8nResource {
  static readonly ResourceId = 'householdsInvitations';
  static readonly Resource: INodePropertyOptions = {
    name: 'Households: Invitations',
    value: HouseholdsInvitationsResource.ResourceId,
  };
  static readonly Operations: INodeProperties[] = [
    {
      displayName: 'Operation',
      name: 'operation',
      type: 'options',
      noDataExpression: true,
      displayOptions: {
        show: {
          resource: [HouseholdsInvitationsResource.ResourceId],
        },
      },
      options: [
        CreateInviteTokenOperation.Operation,
        GetInviteTokensOperation.Operation,
        EmailInvitationOperation.Operation,
      ],
      default: '',
    },
    ...CreateInviteTokenOperation.Fields,
    ...GetInviteTokensOperation.Fields,
    ...EmailInvitationOperation.Fields,
  ];
}
