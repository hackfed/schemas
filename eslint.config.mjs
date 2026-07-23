import nodeConfig from '@bksp/style-guide/eslint/node'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  nodeConfig,
  {
    files: ['./src/schemas/**/*.ts'],
    rules: {
      // Disable nested calls limit for Zod schemas, as they can be deeply nested.
      'unicorn/max-nested-calls': 'off'
    }
  }
)
