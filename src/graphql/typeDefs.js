import { gql } from 'apollo-server';


const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        login: String!
        password: String!
        email: String!
        createdAt: Date!
        deletedAt: Date!
    }

    type LoginResponse {
        accessToken: String!
        user: User!
    }

    type InfoResponse {
        ok: Boolean
        error: String!        
    }    

    type Users {
        rows: [User!]!
        count: Int!
    }

    type Query {
        users(offset: Int!, limit: Int!, order: String!, orderBy: String!, searchText: String!): Users!
        me: User
        usersCount: Int!
        user(id: ID!): User
    }

    type Mutation {
        createUser(login: String!, email: String!, password: String!): InfoResponse
        loginUser(login: String!, password: String!): LoginResponse       
        logoutUser: Boolean
        updateUser(id: ID!, login: String!, email: String!, password: String!): InfoResponse
        deleteUser(id: ID!): InfoResponse
    }
`;

export default typeDefs;