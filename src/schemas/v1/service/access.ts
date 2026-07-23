import { z } from 'zod'

export const AccessServiceGitHubMaintainerSchema = z
  .object({
    type: z.literal('github'),
    username: z.string().describe('Username for GitHub type maintainers'),
  })
  .describe('Maintainer identified by GitHub username')

export const AccessServiceEmailMaintainerSchema = z
  .object({
    email: z.email().describe('Email address for email type maintainers'),
    type: z.literal('email'),
  })
  .describe('Maintainer identified by email address')

export const AccessServiceMaintainerSchema = z.discriminatedUnion('type', [
  AccessServiceGitHubMaintainerSchema,
  AccessServiceEmailMaintainerSchema,
])

export const AccessServiceSchema = z
  .object({
    maintainers: z
      .array(AccessServiceMaintainerSchema)
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
export type AccessServiceEmailMaintainer = z.infer<typeof AccessServiceEmailMaintainerSchema>
export type AccessServiceGitHubMaintainer = z.infer<typeof AccessServiceGitHubMaintainerSchema>
export type AccessServiceMaintainer = z.infer<typeof AccessServiceMaintainerSchema>
