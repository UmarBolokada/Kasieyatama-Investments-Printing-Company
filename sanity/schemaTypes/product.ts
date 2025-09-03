import { ShoppingBagIcon } from "lucide-react";
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: ShoppingBagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    })  ,
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price for showing discounts',
    }),
    // defineField({
    //   name: 'sku',
    //   title: 'SKU',
    //   type: 'string',
    //   description: 'Stock Keeping Unit',
    // }),
    // defineField({
    //   name: 'barcode',
    //   title: 'Barcode',
    //   type: 'string',
    // }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {
          name: 'width',
          title: 'Width (cm)',
          type: 'number',
        },
        {
          name: 'height',
          title: 'Height (cm)',
          type: 'number',
        },
        {
          name: 'depth',
          title: 'Depth (cm)',
          type: 'number',
        },
        {
          name: 'weight',
          title: 'Weight (kg)',
          type: 'number',
        },
      ],
      }),
    // defineField({
    //   name: 'seo',
    //   title: 'SEO',
    //   type: 'object',
    //   fields: [
    //     {
    //       name: 'metaTitle',
    //       title: 'Meta Title',
    //       type: 'string',
    //     },
    //     {
    //       name: 'metaDescription',
    //       title: 'Meta Description',
    //       type: 'text',
    //       rows: 3,
    //     },
    //     {
    //       name: 'metaKeywords',
    //       title: 'Meta Keywords',
    //       type: 'array',
    //       of: [{ type: 'string' }],
    //     },
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.title',
      productType: 'productType.title',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, category, productType, media } = selection;
      return {
        title,
        subtitle: `${category} • ${productType}`,
        media,
      };
    },
  },
});