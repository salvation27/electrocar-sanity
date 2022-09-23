// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import product from './product/product'
import category from './product/category'
import brend from './product/brend'
import user from './product/user'
import order from './product/order'
import orderItems from './product/orderItems'
import paymentResult from './product/paymentResult'
import shippingAddress from './product/shippingAddress'



// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    product,
    category,
    brend,
    user,
    order,
    orderItems,
    paymentResult,
    shippingAddress
  ]),
})
