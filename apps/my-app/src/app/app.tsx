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
      <div className="App p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">GraphQL Book Management</h1>
        <AddBook />
        <UpdateBook />
        <DeleteBook />
        <BookList />
        <BookSubscriptions />
      </div>
    </ApolloProvider>
  );
}

export default App;
