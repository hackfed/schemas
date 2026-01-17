import { z } from 'zod'

export const GithubMaintainerSchema = z
  .object({
    type: z.literal('github'),
    username: z.string().describe('Username for GitHub type maintainers'),
  })
  .describe('Maintainer identified by GitHub username')

export const EmailMaintainerSchema = z
  .object({
    email: z.email().describe('Email address for email type maintainers'),
    type: z.literal('email'),
  })
  .describe('Maintainer identified by email address')

export const MaintainerSchema = z.discriminatedUnion('type', [
  GithubMaintainerSchema,
  EmailMaintainerSchema,
])

export const AccessServiceSchema = z
  .object({
    maintainers: z
      .array(MaintainerSchema)
      .min(1)
      .describe('List of organization maintainers')
      .optional(),
  })
  .strict()
  .meta({
    description: 'Access control and maintainer information for an organization',
    id: 'AccessService',
    title: 'Organization Access Service',
  })

export type AccessService = z.infer<typeof AccessServiceSchema>
export type Maintainer = z.infer<typeof MaintainerSchema>
export type GithubMaintainer = z.infer<typeof GithubMaintainerSchema>
export type EmailMaintainer = z.infer<typeof EmailMaintainerSchema>

export const __schemas = [AccessServiceSchema]
