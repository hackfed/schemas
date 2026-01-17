import { z } from 'zod'

import { OrganizationIdSchema } from './organization-id'

export const ResourceDefinitionSchema = z
  .object({
    $schema: z.url().optional().describe('URL of the schema definition'),
    apiVersion: z.literal('hackfed/v1').describe('API version identifier'),
    kind: z.literal('Organization').describe('Resource type'),
    metadata: z
      .object({
        orgId: OrganizationIdSchema.describe('Identifier of the organization owning this resource'),
      })
      .describe('Metadata about the organization'),
    spec: z.object(),
  })
  .meta({
    description: 'Base schema for Hackfed resource definitions',
    id: 'ResourceDefinition',
    title: 'Resource Definition',
  })

export type ResourceDefinition = z.infer<typeof ResourceDefinitionSchema>

export const __schemas = [ResourceDefinitionSchema]
