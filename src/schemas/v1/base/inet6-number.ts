import { z } from 'zod'

export const Inet6NumberSchema = z
  .string()
  .regex(
    /^(((?:[0-9A-Fa-f]{1,4}))*((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))*((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7})(\/([1-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8])){0,1}$/
  )
  .meta({
    description: 'An IPv6 address in standard notation',
    examples: ['fd79:7636:1f08:883d::008', '2001:db8::1', '::1', 'fe80::1/128'],
    id: 'Inet6Number',
    title: 'IPv6 Address',
  })

export type Inet6Number = z.infer<typeof Inet6NumberSchema>

export const __schemas = [Inet6NumberSchema]
