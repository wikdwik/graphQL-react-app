import { useSubscription, gql } from '@apollo/client';

const BOOK_ADDED = gql`
  subscription OnBookAdded {
    bookAdded {
      id
      title
      author
    }
  }
`;

const BOOK_UPDATED = gql`
  subscription OnBookUpdated {
    bookUpdated {
      id
      title
      author
    }
  }
`;

const BOOK_DELETED = gql`
  subscription OnBookDeleted {
    bookDeleted {
      id
      title
      author
    }
  }
`;

function BookSubscriptions() {
  const { data: addedData } = useSubscription(BOOK_ADDED);
  const { data: updatedData } = useSubscription(BOOK_UPDATED);
  const { data: deletedData } = useSubscription(BOOK_DELETED);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Real-Time Updates</h2>
      {addedData && (
        <p className="text-green-500">
          New Book Added: {addedData.bookAdded.title} by{' '}
          {addedData.bookAdded.author}
        </p>
      )}
      {updatedData && (
        <p className="text-yellow-500">
          Book Updated: {updatedData.bookUpdated.title} by{' '}
          {updatedData.bookUpdated.author}
        </p>
      )}
      {deletedData && (
        <p className="text-red-500">
          Book Deleted: {deletedData.bookDeleted.title} by{' '}
          {deletedData.bookDeleted.author}
        </p>
      )}
    </div>
  );
}

export default BookSubscriptions;
