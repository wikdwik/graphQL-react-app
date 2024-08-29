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
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Book
        </button>
      </form>
      {data && (
        <p className="mt-4 text-green-500">
          Added: {data.addBook.title} by {data.addBook.author}
        </p>
      )}
    </div>
  );
}

export default AddBook;
