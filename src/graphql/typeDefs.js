import { gql } from "apollo-server";


const typeDefs = gql`
    type User {
        userId: ID!
        login: String!
        password: String!
        email: String!
    }

    type LoginResponse {
        accessToken: String!
        user: User!
    }

    type Query {
        users: [User!]!
        me: User
    }

    type Mutation {
        createUser(login: String!, password: String!): Boolean
        loginUser(login: String!, password: String!): LoginResponse
        updateTokenVersionForUser(userId: ID!): Boolean
        logoutUser: Boolean
    }

`;

export default typeDefs;