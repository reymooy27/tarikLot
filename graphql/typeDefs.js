const {gql} = require('apollo-server-express')

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    lotId: ID
    tarikLotID: ID
  }

  type Query {
    getAllProduct: [Product]
    getProduct(_id: ID): Product
  }

  input ProductInput {
    name: String,
    tarikLotID: ID
  }

  type Mutation {
    createProduct(product: ProductInput): Product
    deleteProduct(_id: ID): String
  }

  type Subscription{
    productCreated: Product
  }
`;

module.exports = typeDefs