import { kebabCase } from 'change-case'
import { glob } from 'glob'
import { mkdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Schema, z } from 'zod'

const VERSIONS = ['v1']
const TARGET_DIR = path.resolve(import.meta.dirname, '../../public/')

const registry = z.registry()
const schemas = new Map<string, z.ZodSchema>()

for await (const version of VERSIONS) {
  // Enumerate and register schemas
  const schemasPaths = await glob(path.resolve(import.meta.dirname, `../schemas/${version}/**/*.ts`))
  for await (const schemaPath of schemasPaths) {
    const schemaModule = await import(schemaPath)

    for (const schema of Object.values(schemaModule)) {
      // Skip everything but Zod schemas
      if (!(schema instanceof z.ZodType)) continue

      // Skip schemas without ID in metadata – these are internal helper schemas
      const meta = schema.meta()
      if (!meta?.id) {
        continue
      }

      registry.add(schema, { id: meta.id })
      schemas.set(meta.id, schema)
    }
  }

  // Cleanup target directory
  const targetDirectory = path.resolve(TARGET_DIR, version)
  const isDirectoryExists = await stat(targetDirectory).then(() => true).catch(() => false)
  if (isDirectoryExists) {
    await rm(targetDirectory, { force: true, recursive: true })
  }
  await mkdir(targetDirectory, { recursive: true })

  // Generate schemas
  for await (const [id, schema] of schemas) {
    const jsonSchema = schema.toJSONSchema({
      // @ts-expect-error ts(2353) -- something is wrong with Zod's type inference.
      external: {
        registry,
        uri: (referenceId: string) => `https://schemas.hackfed.org/${version}/${kebabCase(referenceId)}.json`
      },
      target: 'draft-2020-12'
    })

    const outputPath = path.resolve(targetDirectory, `${kebabCase(id)}.json`)
    await writeFile(outputPath, JSON.stringify(jsonSchema, null, 2))
  }
}
