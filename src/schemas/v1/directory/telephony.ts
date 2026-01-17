import { z } from 'zod'

import { OrganizationIdSchema } from '../base/organization-id'

export const DirectoryExchangeSchema = z
  .object({
    codecs: z
      .array(z.enum(['opus', 'g722', 'ulaw']))
      .min(1)
      .describe('Supported audio codecs'),
    endpoint: z
      .string()
      .describe('Network address and port of the exchange (e.g., [IPv6]:port or IPv4:port)'),
    id: z.string().describe('Unique exchange identifier within the organization'),
    prefixes: z
      .array(z.e164().describe('Telephony number prefix (e.g., country or area code)'))
      .describe('Telephony number prefixes allocated to the organization for this exchange'),
    protocol: z.enum(['iax2']).describe('Telephony protocol used by the exchange'),
  })
  .strict()

export const DirectoryOrgSchema = z
  .object({
    exchanges: z
      .array(DirectoryExchangeSchema)
      .describe('List of telephony exchanges for the organization'),
    name: z.string().describe('Name of the organization'),
    orgId: OrganizationIdSchema.describe('Unique identifier for the organization'),
  })
  .strict()

export const TelephonyDirectorySchema = z
  .object({
    orgs: z
      .array(DirectoryOrgSchema)
      .describe('List of organizations participating in Hackfed Telephony Network.'),
  })
  .meta({
    description: 'Aggregated telephony service information for Hackfed network members.',
    id: 'TelephonyDirectory',
    title: 'Hackfed Telephony Directory',
  })

export type TelephonyDirectory = z.infer<typeof TelephonyDirectorySchema>
export type DirectoryOrg = z.infer<typeof DirectoryOrgSchema>
export type DirectoryExchange = z.infer<typeof DirectoryExchangeSchema>

export const __schemas = [TelephonyDirectorySchema]
