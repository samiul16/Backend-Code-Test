import { gql } from "graphql-tag";

const typeDefs = gql`
  #graphql
  directive @auth(roles: [String]!) on FIELD_DEFINITION | OBJECT
  scalar Long
  scalar JSON

  type Action {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Trigger {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Response {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    platforms: [ResponsePlatform]
  }

  type ResponsePlatform {
    integrationId: ID
    build: Int
    localeGroups: [ResponseLocaleGroup]
  }

  type ResponseLocaleGroup {
    id: ID
    name: String
  }

  type ResponseVariation {
    name: String!
    responses: JSON
  }

  type ResourceTemplate {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    schema: JSON
    integrationId: String
    functionString: String
    key: String
  }

  type NodeObject {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    parents: [NodeObject]
    parentIds: [ID]
    root: Boolean
    trigger: Trigger
    triggerId: ID
    responses: [Response]
    responseIds: [ID]
    actions: [Action]
    actionIds: [ID]
    priority: Float
    compositeId: ID
    global: Boolean
    colour: String
  }

  type Query {
    node(nodeId: ID): NodeObject @auth(roles: ["admin", "user"])
    nodes(limit: Int = 10, offset: Int = 0): [NodeObject!]!
      @auth(roles: ["admin", "user"])

    action(actionId: ID!): Action @auth(roles: ["admin", "user"])
    actions(ids: [ID!]): [Action!]! @auth(roles: ["admin", "user"])

    response(responseId: ID!): Response @auth(roles: ["admin", "user"])
    responses(ids: [ID!]): [Response!]! @auth(roles: ["admin", "user"])

    trigger(triggerId: ID!): Trigger @auth(roles: ["admin", "user"])
    triggers(ids: [ID!]): [Trigger!]! @auth(roles: ["admin", "user"])

    resourceTemplate(resourceTemplateId: ID!): ResourceTemplate
      @auth(roles: ["admin", "user"])
    resourceTemplates(ids: [ID!]): [ResourceTemplate!]!
      @auth(roles: ["admin", "user"])
  }
`;

export default typeDefs;
