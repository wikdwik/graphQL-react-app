import { useQuery, gql } from '@apollo/client';

type Book = {
  id: string;
  title: string;
  author: string;
};

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.books.map((book: Book) => (
        <li key={book.id} id={book.id}>
          <strong>{book.title}</strong> by <strong>{book.author}</strong>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
