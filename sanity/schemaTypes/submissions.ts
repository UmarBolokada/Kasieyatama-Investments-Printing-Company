import { UploadIcon } from "lucide-react";
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'submission',
  title: 'Submissions',
  type: 'document',
  icon: UploadIcon,
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designImage',
      title: 'Design Image',
      type: 'image',
      options: { hotspot: false },
      validation: (Rule) => Rule.required().custom(async (image, context) => {
        if (!image?.asset?._ref) return 'Image is required';
        try {
          const id = image.asset._ref;
          const client = context.getClient({ apiVersion: '2024-03-01' });
          const asset = await client.fetch(`*[_id == $id][0]{size}`, { id });
          const maxBytes = 10 * 1024 * 1024; // 10MB
          if (asset?.size && asset.size > maxBytes) {
            return 'Image must be less than 10MB';
          }
          return true;
        } catch (_err) {
          return 'Unable to validate image size';
        }
      }),
    }),
    defineField({
      name: 'note',
      title: 'Note (Optional)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(1000),
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
      title: 'fullName',
      subtitle: 'email',
      media: 'designImage',
    },
  },
});
