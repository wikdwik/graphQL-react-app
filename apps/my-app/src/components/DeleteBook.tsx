import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      author
    }
  }
`;

function DeleteBook() {
  const [id, setId] = useState('');
  const [deleteBook, { data }] = useMutation(DELETE_BOOK);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteBook({ variables: { id } });
    setId('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Delete Book</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Book ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Delete Book
        </button>
      </form>
      {data && (
        <p className="mt-4 text-green-500">
          Deleted: {data.deleteBook.title} by {data.deleteBook.author}
        </p>
      )}
    </div>
  );
}

export default DeleteBook;
