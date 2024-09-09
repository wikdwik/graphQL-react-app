import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

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
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [isBooksFetched, setIsBooksFetched] = useState(false);

  const handleGetBooks = async () => {
    // Refetch the books and update the state
    await refetch();
    setIsBooksFetched(true);
  };

  if (loading && !isBooksFetched)
    return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>
      <ul className="list-disc pl-5">
        {data?.books?.map((book: Book) => (
          <li key={book.id} id={book.id} className="my-2">
            <span className="font-semibold">{book.title}</span> by {book.author}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="bg-green-500 text-white p-2 rounded mt-4"
        onClick={handleGetBooks}
      >
        Get Books
      </button>
    </>
  );
}

export default BookList;
