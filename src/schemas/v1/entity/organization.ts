import { z } from 'zod'

import { OrganizationIdSchema } from '../base/organization-id'
import { AboutServiceSchema } from '../service/about'
import { AccessServiceSchema } from '../service/access'
import { NebulaServiceSchema } from '../service/nebula'
import { TelephonyServiceSchema } from '../service/telephony'

export const OrganizationSchema = z
  .object({
    apiVersion: z.literal('hackfed/v1').describe('API version identifier'),
    kind: z.literal('Organization').describe('Resource type'),
    metadata: z
      .object({
        orgId: OrganizationIdSchema.describe('Identifier of the organization owning this resource'),
      })
      .describe('Metadata about the organization'),
    spec: z
      .object({
        id: OrganizationIdSchema.describe('Organization ID (must match metadata.orgId)'),
        name: z
          .string()
          .min(4)
          .max(64)
          .describe('Human-readable organization name'),
        services: z
          .object({
            about: AboutServiceSchema.optional(),
            access: AccessServiceSchema.optional(),
            nebula: NebulaServiceSchema.optional(),
            telephony: TelephonyServiceSchema.optional(),
          })
          .describe('Services provided by the organization')
          .optional(),
      })
      .strict()
      .describe('Organization specification'),
  })
  .meta({
    description: 'Complete organization entity definition for Hackfed registry',
    id: 'Organization',
    title: 'Hackfed Organization',
  })

export type Organization = z.infer<typeof OrganizationSchema>

export const __schemas = [OrganizationSchema]
