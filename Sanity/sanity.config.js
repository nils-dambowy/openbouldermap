import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'openbouldermap',

  projectId: 'h1lk1n15',
  dataset: 'boulders',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
