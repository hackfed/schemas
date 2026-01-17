import { z } from 'zod'

export const AboutServiceSchema = z
  .object({
    contact: z
      .object({
        email: z.email().describe("Organization's contact email address").optional(),
        website: z.url().describe("Organization's website URL").optional(),
      })
      .strict()
      .describe('Contact information for the organization')
      .optional(),
  })
  .strict()
  .meta({
    description: 'Contact information and general details about an organization',
    id: 'AboutService',
    title: 'Organization About Service',
  })

export type AboutService = z.infer<typeof AboutServiceSchema>

export const __schemas = [AboutServiceSchema]
