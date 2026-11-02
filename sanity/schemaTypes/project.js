import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Current Website', value: 'current'},
          {title: 'Completed', value: 'completed'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Coming Soon', value: 'coming-soon'},
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'cardColor',
      title: 'Project Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Lavender', value: '#e2e0fa'},
          {title: 'Pastel Pink', value: '#fbe0eb'},
          {title: 'Pastel Cyan', value: '#cef3f8'},
          {title: 'Pastel Green', value: '#e5f0dc'},
          {title: 'Pastel Peach', value: '#f9e8d5'},
        ],
        layout: 'radio',
      },
      initialValue: '#e2e0fa',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Project Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository',
      type: 'url',
    }),

    defineField({
      name: 'demoUrl',
      title: 'Live Demo',
      type: 'url',
    }),

    defineField({
      name: 'overview',
      title: 'Project Overview',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'thumbnail',
    },
  },
})
