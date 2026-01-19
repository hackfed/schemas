import { z } from 'zod'

export const TelephonyServiceExchangeSchema = z
  .object({
    address: z
      .string()
      .describe('Network address and port of the exchange (e.g., [IPv6]:port or IPv4:port)'),
    codecs: z
      .array(z.enum(['opus', 'g722', 'ulaw']))
      .min(1)
      .describe('Supported audio codecs'),
    id: z.string().describe('Unique identifier for the exchange'),
    prefix: z.e164().describe('Numeric prefix used to route calls to this exchange'),
    protocol: z.enum(['iax2']).describe('Telephony protocol used by the exchange')
  })
  .strict()

export const TelephonyServicePhonebookSchema = z
  .object({
    format: z.enum(['hackfed']).describe('Format of the phonebook data'),
    url: z.url().describe('URL to the phonebook resource'),
  })
  .strict()

export const TelephonyServiceSchema = z
  .object({
    exchanges: z.array(TelephonyServiceExchangeSchema).describe('List of telephony exchanges').optional(),
    phonebook: TelephonyServicePhonebookSchema.describe('Phonebook').optional(),
  })
  .strict()
  .meta({
    description: 'Telephony configuration including exchanges, prefixes, and phonebook',
    id: 'TelephonyService',
    title: 'Organization Telephony Service',
  })

export type TelephonyService = z.infer<typeof TelephonyServiceSchema>
export type TelephonyServiceExchange = z.infer<typeof TelephonyServiceExchangeSchema>
export type TelephonyServicePhonebook = z.infer<typeof TelephonyServicePhonebookSchema>
