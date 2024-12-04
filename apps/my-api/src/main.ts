import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import http from 'http';
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { v4 as uuidv4 } from 'uuid';

// Extend the PubSub class to include asyncIterator for TypeScript
interface PubSubWithAsyncIterator extends PubSub {
  asyncIterator: (triggers: string | string[]) => AsyncIterator<unknown>;
}

const pubsub: PubSubWithAsyncIterator = new PubSub() as PubSubWithAsyncIterator;

// Define GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): Book
  }

  type Subscription {
    bookAdded: Book
    bookUpdated: Book
    bookDeleted: Book
  }
`;

const books = [
  { id: uuidv4(), title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: uuidv4(), title: '1984', author: 'George Orwell' },
];

// Define resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { id: uuidv4(), title, author };
      books.push(newBook);
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
      return newBook;
    },
    updateBook: (_, { id, title, author }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) throw new Error('Book not found');

      const updatedBook = { ...books[bookIndex], title, author };
      books[bookIndex] = updatedBook;
      pubsub.publish('BOOK_UPDATED', { bookUpdated: updatedBook });
      return updatedBook;
    },
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) throw new Error('Book not found');

      const [deletedBook] = books.splice(bookIndex, 1);
      pubsub.publish('BOOK_DELETED', { bookDeleted: deletedBook });
      return deletedBook;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
    bookUpdated: {
      subscribe: () => pubsub.asyncIterator(['BOOK_UPDATED']),
    },
    bookDeleted: {
      subscribe: () => pubsub.asyncIterator(['BOOK_DELETED']),
    },
  },
};

async function startServer() {
  const app = express();

  const corsOptions = {
    origin: ['http://localhost:4200', 'https://studio.apollographql.com'],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.use(cors(corsOptions));

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
