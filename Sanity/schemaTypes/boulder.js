import {defineField, defineType} from 'sanity'

export const boulder = defineType({
  name: 'boulder',
  title: 'Boulder',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
        name: 'location',
        type: 'string',
      }),
  ],
})