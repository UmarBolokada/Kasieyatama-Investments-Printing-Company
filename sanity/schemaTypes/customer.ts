import { UserIcon } from "lucide-react";
import { defineField } from "sanity";

export default defineField({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
      media: 'phone',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'No title',
        subtitle: subtitle || 'No subtitle',
        media: media || 'No media',
      };
    },
  }
})