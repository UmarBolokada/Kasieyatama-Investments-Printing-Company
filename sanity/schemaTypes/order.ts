import { ShoppingCartIcon } from "lucide-react";
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: ShoppingCartIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
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
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }
          ],
          preview: {
            select: {
              quantity: 'quantity',
              image: 'product.image',
              price: 'product.price',
              currency: 'product.currency',
            },
            prepare(selection) {
              const { quantity, image, price, currency } = selection;
              return {
                title: `${quantity} x ${price} ${currency}`,
                subtitle: `Quantity: ${quantity}`,
                media: image,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    // defineField({
    //   name: 'subtotal',
    //   title: 'Subtotal',
    //   type: 'number',
    //   validation: (Rule) => Rule.required().positive(),
    // }),
    defineField({
      name: 'stripeCheckoutSessionId',
      title: 'Stripe Checkout Session ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    // ----------------
    // defineField({
    //   name: 'shipping',
    //   title: 'Shipping Cost',
    //   type: 'number',
    //   initialValue: 0,
    // }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'paymentMethod',
    //   title: 'Payment Method',
    //   type: 'string',
    //   options: {
    //     list: [
    //       { title: 'Credit Card', value: 'credit_card' },
    //       { title: 'PayPal', value: 'paypal' },
    //       { title: 'Bank Transfer', value: 'bank_transfer' },
    //       { title: 'Cash on Delivery', value: 'cod' },
    //     ],
    //   },
    // }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
        },
        {
          name: 'company',
          title: 'Company',
          type: 'string',
        },
        {
          name: 'address1',
          title: 'Address Line 1',
          type: 'string',
        },
        {
          name: 'address2',
          title: 'Address Line 2',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
      ],
    }),
    // defineField({
    //   name: 'notes',
    //   title: 'Order Notes',
    //   type: 'text',
    //   rows: 3,
    // }),
    // defineField({
    //   name: 'trackingNumber',
    //   title: 'Tracking Number',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'shippedAt',
    //   title: 'Shipped At',
    //   type: 'datetime',
    // }),
    // defineField({
    //   name: 'deliveredAt',
    //   title: 'Delivered At',
    //   type: 'datetime',
    // }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    // defineField({
    //   name: 'updatedAt',
    //   title: 'Updated At',
    //   type: 'datetime',
    //   readOnly: true,
    // }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      customer: 'customer.firstName',
      status: 'status',
      total: 'totalPrice',
      media: 'customer.phone',
    },
    prepare(selection) {
      const { title, customer, status, total, media } = selection;
      return {
        title: `Order ${title}`,
        subtitle: `${customer} • ${status} • $${total}`,
        media,
      };
    },
  },
}); 