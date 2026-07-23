import { z } from 'zod'

import { Inet6NumberSchema } from '../base/inet6-number'

export const WireguardServicePeerSchema = z
  .object({
    address: Inet6NumberSchema.describe('IPv6 address inside the tunnel'),
    endpoint: z.string()
      .regex(/^[a-zA-Z0-9.-]+:\d+$/)
      .describe('Public endpoint in format "host:port". Null, if the node cannot be reached from the outside (behind NAT, has no public IP, etc.)')
      .nullable(),
    publicKey: z.base64().describe('Public key of the node in base64 format'),
  })
  .strict()

export const WireguardServiceSchema = z.array(WireguardServicePeerSchema).meta({
  description: 'Wireguard VPN network configuration for the organization',
  id: 'WireguardService',
  title: 'Organization Wireguard Service',
})

export type WireguardService = z.infer<typeof WireguardServiceSchema>
export type WireguardServicePeer = z.infer<typeof WireguardServicePeerSchema>
