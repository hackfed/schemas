import { z } from 'zod'

import { OrganizationIdSchema } from '../base/organization-id'

export const TelephonyDirectoryPhonebookSchema = z
  .object({
    format: z.enum(['hackfed']).describe('Format of the phonebook data'),
    url: z.url().describe('URL to the phonebook resource'),
  })
  .meta({
    description: 'Information about a public phonebook for an organization.',
    id: 'TelephonyDirectoryPhonebook',
    title: 'Hackfed Telephony Directory Phonebook',
  })

export const TelephonyDirectoryExchangeSchema = z
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
  .meta({
    description: 'Information about a telephony exchange for an organization.',
    id: 'TelephonyDirectoryExchange',
    title: 'Hackfed Telephony Directory Exchange',
  })

export const TelephonyDirectoryOrgSchema = z
  .object({
    exchanges: TelephonyDirectoryExchangeSchema
      .array()
      .describe('List of telephony exchanges for the organization'),
    name: z.string().describe('Name of the organization'),
    orgId: OrganizationIdSchema.describe('Unique identifier for the organization'),
    phonebooks: TelephonyDirectoryPhonebookSchema.array().describe('Public phonebook URLs for the organization'),
  })
  .meta({
    description: 'Information about an organization participating in Hackfed Telephony Network.',
    id: 'TelephonyDirectoryOrg',
    title: 'Hackfed Telephony Directory Organization',
  })

export const TelephonyDirectorySchema = z
  .object({
    orgs: z
      .array(TelephonyDirectoryOrgSchema)
      .describe('List of organizations participating in Hackfed Telephony Network.'),
  })
  .meta({
    description: 'Aggregated telephony service information for Hackfed network members.',
    id: 'TelephonyDirectory',
    title: 'Hackfed Telephony Directory',
  })

export type TelephonyDirectory = z.infer<typeof TelephonyDirectorySchema>
export type TelephonyDirectoryOrg = z.infer<typeof TelephonyDirectoryOrgSchema>
export type TelephonyDirectoryExchange = z.infer<typeof TelephonyDirectoryExchangeSchema>
export type TelephonyDirectoryPhonebook = z.infer<typeof TelephonyDirectoryPhonebookSchema>

export const __schemas = [
  TelephonyDirectorySchema,
  TelephonyDirectoryOrgSchema,
  TelephonyDirectoryExchangeSchema,
  TelephonyDirectoryPhonebookSchema
]
