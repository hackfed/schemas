import { z } from 'zod'

export const OrganizationIdSchema = z
  .string()
  .regex(/^[a-z0-9]*$/)
  .min(4)
  .max(16)
  .meta({
    description: 'A unique identifier for an organization in the Hackfed registry',
    examples: ['bksp', 'xkem'],
    id: 'OrganizationId',
    title: 'Organization ID',
  })

export type OrganizationId = z.infer<typeof OrganizationIdSchema>

export const __schemas = [OrganizationIdSchema]
