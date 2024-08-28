import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import AddBook from '../components/AddBook';
import BookList from '../components/BookList';
import UpdateBook from '../components/UpdateBook';
import DeleteBook from '../components/DeleteBook';
import BookSubscriptions from '../components/BookSubscriptions';

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>
        <strong>GraphQL Book Management</strong>
      </h1>
      <br />
      <BookList />
      <br />
      <AddBook />
      <br />
      <UpdateBook />
      <br />
      <DeleteBook />
      <br />
      <BookSubscriptions />
    </ApolloProvider>
  );
}

export default App;
