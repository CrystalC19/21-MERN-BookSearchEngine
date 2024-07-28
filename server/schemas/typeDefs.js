const { gql } = require ("apollo-server-express")

const typeDefs = gql `
input BookInput {
authors: [String]
description: String
title: String!
bookId: String
image: String
link: String
}

type User {
_id: ID!
username: String!
email: string!
bookCount: Int
savedBooks:[Book]
}

type Book{
bookId: ID!
authors:[String]
description: Sting
title: String!
image: String
link: String
}

type Auth {
token: ID!
user: User
}

type Query{
me: User
}

type Mutation{
login(email: String!, password:String!): Auth
addUser( username: String!, email: String!, password: String!) Auth
saveBook (input: BookInput): User]
removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;