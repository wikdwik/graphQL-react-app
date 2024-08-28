import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [addBook, { data }] = useMutation(ADD_BOOK);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addBook({ variables: { title, author } });
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Book</button>
      </form>
      {data && (
        <p>
          Added: {data.addBook.title} by {data.addBook.author}
        </p>
      )}
    </div>
  );
}

export default AddBook;
