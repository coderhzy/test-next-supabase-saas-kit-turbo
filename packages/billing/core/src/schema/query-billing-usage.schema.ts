import { z } from 'zod';

const PageFilter = z.object(
  {
    page: z.number(),
    size: z.number(),
  },
  {
    description: `The page and size to filter the usage records. Used for LS`,
  },
);

export const QueryBillingUsageSchema = z.object({
  id: z.string({
    description:
      'The id of the usage record. For Stripe a meter ID, for LS a subscription item ID.',
  }),
  customerId: z.string({
    description: 'The id of the customer in the billing system',
  }),
  filter: PageFilter,
});
