import { z } from 'zod'

import { Inet6NumberSchema } from '../base/inet6-number'

export const NebulaNodeSchema = z
  .object({
    address: Inet6NumberSchema.describe('IPv6 address of the Nebula node'),
    certificates: z
      .array(
        z
          .string()
          .regex(/^[a-f0-9]{64}$/)
          .describe('SHA-256 certificate fingerprint in hexadecimal')
      )
      .min(1)
      .describe('List of certificate fingerprints for the node'),
    lighthouse: z
      .object({
        enabled: z.boolean().describe('Whether this node acts as a lighthouse'),
        endpoints: z
          .array(z.string().describe('Endpoint in format host:port'))
          .min(1)
          .describe('Public endpoints for lighthouse connectivity')
          .optional(),
      })
      .strict()
      .describe('Lighthouse configuration for the node')
      .optional(),
  })
  .strict()

export const NebulaServiceSchema = z.array(NebulaNodeSchema).meta({
  description: 'Nebula VPN network configuration for the organization',
  id: 'NebulaService',
  title: 'Organization Nebula Service',
})

export type NebulaService = z.infer<typeof NebulaServiceSchema>
export type NebulaNode = z.infer<typeof NebulaNodeSchema>

export const __schemas = [NebulaServiceSchema]
