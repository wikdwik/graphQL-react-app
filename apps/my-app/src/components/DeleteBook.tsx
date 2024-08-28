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
  };

  return (
    <div>
      <h2>Delete Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Delete Book</button>
      </form>
      {data && (
        <p>
          Deleted: {data.deleteBook.title} by {data.deleteBook.author}
        </p>
      )}
    </div>
  );
}

export default DeleteBook;
