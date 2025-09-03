import { ShoppingCartIcon } from "lucide-react";
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cart',
  title: 'Cart',
  type: 'document',
  icon: ShoppingCartIcon,
  fields: [
    defineField({
      name: 'clerkId',
      title: 'Clerk User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Cart Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            },
            {
              name: 'price',
              title: 'Price Snapshot',
              type: 'number',
              description: 'Price at the time item was added to cart',
            },
          ],
          preview: {
            select: {
              title: 'product.title',
              image: 'product.mainImage',
              quantity: 'quantity',
              price: 'price',
            },
            prepare({ title, image, quantity, price }) {
              return {
                title: `${title || 'Item'} x ${quantity || 1}`,
                subtitle: price ? `$${price}` : undefined,
                media: image,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'clerkId',
      itemsCount: 'items.length',
    },
    prepare({ title, itemsCount }) {
      return {
        title: `Cart • ${title}`,
        subtitle: `${itemsCount || 0} items`,
      };
    },
  },
});


