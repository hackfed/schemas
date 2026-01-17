import { z } from 'zod'

import { OrganizationIdSchema } from '../base/organization-id'
import { ResourceDefinitionSchema } from '../base/resource-definition'
import { AboutServiceSchema } from '../service/about'
import { AccessServiceSchema } from '../service/access'
import { NebulaServiceSchema } from '../service/nebula'
import { TelephonyServiceSchema } from '../service/telephony'

export const OrganizationSchema = ResourceDefinitionSchema
  .extend({
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
