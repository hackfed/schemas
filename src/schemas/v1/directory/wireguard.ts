import { z } from 'zod'

import { OrganizationIdSchema } from '../base/organization-id'
import { WireguardServicePeerSchema } from '../service/wireguard'

export const WireguardDirectoryOrgSchema = z
  .object({
    name: z.string().describe('Name of the organization'),
    orgId: OrganizationIdSchema.describe('Unique identifier for the organization'),
    peers: WireguardServicePeerSchema.array()
  })
  .meta({
    description: 'Directory entry representing Organisation participation in Hackfed WireGuard full-mesh network.',
    id: 'WireguardDirectoryOrg',
    title: 'Hackfed Wireguard Directory Organization',
  })

export const WireguardDirectorySchema = z
  .object({
    orgs: z
      .array(WireguardDirectoryOrgSchema)
      .describe('List of organizations participating in Hackfed Wireguard Network.'),
  })
  .meta({
    description: 'Aggregated Wireguard service information for Hackfed network members.',
    id: 'WireguardDirectory',
    title: 'Hackfed Wireguard Directory',
  })

export type WireguardDirectory = z.infer<typeof WireguardDirectorySchema>
export type WireguardDirectoryOrg = z.infer<typeof WireguardDirectoryOrgSchema>
