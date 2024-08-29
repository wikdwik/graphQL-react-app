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
    setId('');
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Book ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-full"
        />
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
        <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
          Update Book
        </button>
      </form>
      {data && (
        <p className="mt-4 text-green-500">
          Updated: {data.updateBook.title} by {data.updateBook.author}
        </p>
      )}
    </div>
  );
}

export default UpdateBook;
