# Backend-Code-Test (The Red IT)

# GraphQL API Server Documentation

## Overview

This GraphQL API server provides a flexible interface for querying node-based data with authentication support. The server uses Apollo Server 4 and implements bearer token authentication with custom directives.

## Table of Contents

1. Features
2. Installation
3. Running the Server
4. Project Structure
5. Implementation Details
6. Authentication
7. Query Examples

## Features

- GraphQL API with type-safe schema
- Bearer token authentication
- Custom scalar types (Long, JSON)
- Two different approach for Data loading from JSON files
- Custom auth directive for field-level permissions
- Pagination support for node queries
- Authorization role checking by Custom schema directive
- Es-lint checking

## Installation

1. Ensure you have Node.js (v16+) installed
2. Clone the repository
3. Install dependencies:

npm install

4. Create a .env file in the root directory with the following variables:

JWT_SECRET_KEY=629e31fd1f5e6a0aa0f87c2eb6f206a3144eaa9e751c5c77b57c7dac993980f0

## Running the Server

### Development Mode (with auto-restart)

npm run dev

### Linting

npm run lint

The server will start on port 4000 by default. Access the GraphQL playground at http://localhost:4000

## Authentication

To authenticate requests:

1. Include an Authorization header with your requests
2. Format: Bearer your-token

## Project Structure

graphql-api-server/
├── src/
│ ├── index.js # Main server entry point
│ ├── schema.js # GraphQL type definitions
│ ├── resolvers.js # GraphQL resolvers
│ ├── dataLoader.js # Data loading from JSON files
│ ├── auth.js # Authentication middleware
│ ├── directives/ # Custom GraphQL directives
│ │ └── auth.js # Auth directive implementation
│ └── scalars.js # Custom scalar type definitions
| ├── modules/ # Modules
│ │ └── node/
│ │ └── nodeHelper.js # Helper for preparing data
├── package.json
├── lib/
│ ├── utils.js # Utility functions
└── (data files) # JSON data files loaded by dataLoader.js

## Implementation Details

### Server Setup

The server is configured in index.js with:

- Apollo Server 4 as the GraphQL server
- Standalone server configuration
- Schema stitching with @graphql-tools/schema
- Custom authentication directive
- Context setup with user authentication and data sources

### Data Loading

The dataLoader.js reads from JSON files and provides methods to:

- Get all entities of a type
- Get specific entities by ID
- The data is loaded once at startup for performance

### Authentication

- Bearer token authentication via Authorization header
- Implemented in auth.js
- Custom @auth directive for query-level permissions
- User context is added to all resolvers

### Schema Design

The schema (defined in schema.js) includes:

- Custom scalar types (Long, JSON)
- Node-based data model with relationships
- Pagination support(for node)

### Resolvers

The resolvers.js implements:

- Query resolvers for all root fields
- Field resolvers for relationship fields
- Custom scalar handling
- Data fetching through context's data sources

## Query Examples

### Get a node with its relationships

query GetNode($nodeId: ID!) {
node(nodeId: $nodeId) {
id
name
parents {
id
name
}
trigger {
id
type
}
responses {
id
message
}
actions {
id
type
}
}
}

### Get paginated nodes

query GetNodes($limit: Int!, $offset: Int!) {
nodes(limit: $limit, offset: $offset) {
id
name
}
}

### Get multiple actions by ID

query GetActions($actionIds: [ID!]!) {
actions(ids: $actionIds) {
id
type
resourceTemplate {
id
name
}
}
}

### Get triggers with resource templates

query GetTriggers {
triggers {
id
type
resourceTemplate {
id
name
}
}
}

## Custom Scalars

The API implements two custom scalar types:

1. Long - For large integers
2. JSON - For unstructured data

## Error Handling

The API provides detailed error messages for:

- Authentication failures
- Invalid queries
- Missing or invalid data
- Type validation errors
