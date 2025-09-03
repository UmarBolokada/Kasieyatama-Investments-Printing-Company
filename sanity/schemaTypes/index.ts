import { type SchemaTypeDefinition } from 'sanity'
import Product from './product'
import Category from './category'
import Order from './order' 
import BlockContent from './blockContent'
import Sale from './sale'
import Customer from './customer'
import Submission from './submissions'
import Cart from './cart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product, Category, Order, BlockContent, Sale, Customer, Submission, Cart],
}
