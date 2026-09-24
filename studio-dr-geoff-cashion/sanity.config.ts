import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {FIXED_TYPES, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Dr Geoff Cashion',

  projectId: '4odz5ftz',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Site Settings and Pages map onto code, so no new ones from the + menu
    templates: (templates) => templates.filter(({schemaType}) => !FIXED_TYPES.has(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      FIXED_TYPES.has(schemaType)
        ? actions.filter(({action}) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish')
        : actions,
  },
})
