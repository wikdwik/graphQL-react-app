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

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      <ul className="list-disc pl-5">
        {data.books.map((book: Book) => (
          <li key={book.id} id={book.id} className="my-2">
            <span className="font-semibold">{book.title}</span> by {book.author}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookList;
