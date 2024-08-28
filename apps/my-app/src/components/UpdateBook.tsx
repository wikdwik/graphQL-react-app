import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $author: String) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

function UpdateBook() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [updateBook, { data }] = useMutation(UPDATE_BOOK);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateBook({ variables: { id, title, author } });
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Update Book</button>
      </form>
      {data && (
        <p>
          Updated: {data.updateBook.title} by {data.updateBook.author}
        </p>
      )}
    </div>
  );
}

export default UpdateBook;
