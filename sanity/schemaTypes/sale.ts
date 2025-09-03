import { defineField } from "sanity";
import {  TagIcon } from "lucide-react";

export default defineField({
  name: 'sale',
  title: 'Promo Sale',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sale Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Sale Description',
      type: 'text',
    }),
    defineField({
      name: 'discountAmount',
      title: 'Discount Amount',
      type: 'number',
      description: 'Enter the discount amount in percentage',
    }),
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
      description: 'Enter the coupon code',
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'date',
      description: 'Enter the valid from date',
    }),
    defineField({
      name: 'validTo',
      title: 'Valid To',
      type: 'date',
      description: 'Enter the valid to date',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Is the sale active?',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      return {
        title: title || 'No title',
        subtitle: `Discount: ${discountAmount}% | Coupon: ${couponCode} | Active: ${isActive ? 'Yes' : 'No'}`,
      };
    },
  }
})