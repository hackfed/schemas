import { kebabCase } from 'change-case'
import { glob } from 'glob'
import { mkdir, stat, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

const VERSIONS = ['v1']
const TARGET_DIR = path.resolve(import.meta.dirname, '../../public/')

const registry = z.registry()
const schemas = new Map<string, z.ZodSchema>()

for await (const version of VERSIONS) {
  // Enumerate and register schemas
  const schemasPaths = await glob(path.resolve(import.meta.dirname, `../schemas/${version}/**/*.ts`))
  for await (const schemaPath of schemasPaths) {
    const schemaModule = await import(schemaPath)

    const exportedSchemas = (schemaModule.__schemas ?? []) as z.ZodSchema[]
    for (const schema of exportedSchemas) {
      const meta = schema.meta()
      if (!meta || !meta.id) {
        throw new Error(`Schema in ${schemaPath} is missing an 'id' in its metadata.`)
      }

      registry.add(schema, { id: meta.id })
      schemas.set(meta.id, schema)
    }
  }

  // Cleanup target directory
  const targetDirectory = path.resolve(TARGET_DIR, version)
  const isDirectoryExists = await stat(targetDirectory).then(() => true).catch(() => false)
  await (isDirectoryExists ? unlink(path.resolve(targetDirectory, '*.json')) : mkdir(targetDirectory, { recursive: true }))

  for await (const [id, schema] of schemas) {
    const jsonSchema = schema.toJSONSchema({
      external: {
        registry,
        uri: (referenceId: string) => `https://schemas.hackfed.org/v1/${kebabCase(referenceId)}.json`
      },
      target: 'draft-2020-12'
    })

    const outputPath = path.resolve(targetDirectory, `${kebabCase(id)}.json`)
    await writeFile(outputPath, JSON.stringify(jsonSchema, null, 2))
  }
}
