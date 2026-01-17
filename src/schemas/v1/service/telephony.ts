import { z } from 'zod'

export const ExchangeSchema = z
  .object({
    address: z
      .string()
      .describe('Network address and port of the exchange (e.g., [IPv6]:port or IPv4:port)'),
    codecs: z
      .array(z.enum(['opus', 'g722', 'ulaw']))
      .min(1)
      .describe('Supported audio codecs'),
    id: z.string().describe('Unique identifier for the exchange'),
    protocol: z.enum(['iax2']).describe('Telephony protocol used by the exchange'),
  })
  .strict()

export const PrefixSchema = z
  .object({
    description: z.string().describe('Human-readable description of the prefix').optional(),
    exchange: z.string().describe('Reference to the exchange ID handling this prefix'),
    id: z.string().describe('Unique identifier for the prefix'),
    prefix: z.e164().describe('Numeric prefix for phone numbers'),
  })
  .strict()

export const PhonebookSchema = z
  .object({
    format: z.enum(['hackfed']).describe('Format of the phonebook data'),
    url: z.url().describe('URL to the phonebook resource'),
  })
  .strict()

export const TelephonyServiceSchema = z
  .object({
    exchanges: z.array(ExchangeSchema).describe('List of telephony exchanges').optional(),
    phonebook: z.array(PhonebookSchema).describe('Public phonebook URLs').optional(),
    prefixes: z
      .array(PrefixSchema)
      .describe('Telephony number prefixes allocated to the organization')
      .optional(),
  })
  .strict()
  .meta({
    description: 'Telephony configuration including exchanges, prefixes, and phonebook',
    id: 'TelephonyService',
    title: 'Organization Telephony Service',
  })

export type TelephonyService = z.infer<typeof TelephonyServiceSchema>
export type Exchange = z.infer<typeof ExchangeSchema>
export type Prefix = z.infer<typeof PrefixSchema>
export type Phonebook = z.infer<typeof PhonebookSchema>

export const __schemas = [TelephonyServiceSchema]
