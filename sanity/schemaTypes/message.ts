import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  icon: () => '📧',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(20),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(2000),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact_form' },
          { title: 'Phone', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      initialValue: 'contact_form',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for staff use only',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      status: 'status',
      priority: 'priority',
    },
    prepare(selection) {
      const { title, subtitle, status, priority } = selection
      const statusEmoji = {
        new: '🆕',
        read: '👁️',
        replied: '💬',
        closed: '✅',
      }
      const priorityColor = {
        low: 'text-green-600',
        medium: 'text-yellow-600',
        high: 'text-orange-600',
        urgent: 'text-red-600',
      }
      
      return {
        title: `${statusEmoji[status as keyof typeof statusEmoji] || '📧'} ${title}`,
        subtitle: `${subtitle} • ${priority?.toUpperCase() || 'MEDIUM'}`,
        media: () => '📧',
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: '_createdAt', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Priority',
      name: 'priority',
      by: [{ field: 'priority', direction: 'desc' }],
    },
  ],
})
