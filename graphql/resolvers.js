const Product = require('../model/product')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub();

const resolvers = {
  Query: {
    getAllProduct: async ()=> {
      try {
        const allProduct = await Product.find()
        return allProduct
      } catch (error) {
        throw new Error(error)
      }
    },
    
    getProduct: async (parent, args)=> {
      try {
        const product = await Product.findById(args._id)
        return product
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Mutation: {
    createProduct: async (parent, args, context)=>{
      try {
        pubsub.publish('PRODUCT_CREATED', { productCreated: {name: args.product.name,
          tarikLotID: args.product.tarikLotID} });
        const productExist = await Product.findOne({name: args.product.name})
        if(productExist){
          throw new Error('product exist')
        }

        const product = new Product({
          name: args.product.name,
          tarikLotID: args.product.tarikLotID
        })
        await product.save()
        return product
      } catch (error) {
        throw new Error(error)
      }
      
    },

    deleteProduct: async (parent, args, context)=>{
      try {
        const product = await Product.findById(args._id)
        await product.remove()
        return 'Product deleted'
      } catch (error) {
        throw new Error(error)
      }
    }
  },

  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator(['PRODUCT_CREATED']),
    },
  },
};

module.exports = resolvers