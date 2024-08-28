// To set up Apollo Client in our React application, we first configure the client to handle both HTTP and WebSocket connections.
// The HttpLink is used for queries and mutations, while the WebSocketLink handles subscriptions.
// The split function directs operations to the appropriate link based on the type of GraphQL operation.
// Finally, the configured Apollo Client instance is exported for use in our React components.

// src/apolloClient.ts
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Your GraphQL server URL
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql', // Your WebSocket URL
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
