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
    <div>
      <h2>Real-Time Updates</h2>
      {addedData && (
        <p>
          New Book Added: {addedData.bookAdded.title} by{' '}
          {addedData.bookAdded.author}
        </p>
      )}
      {updatedData && (
        <p>
          Book Updated: {updatedData.bookUpdated.title} by{' '}
          {updatedData.bookUpdated.author}
        </p>
      )}
      {deletedData && (
        <p>
          Book Deleted: {deletedData.bookDeleted.title} by{' '}
          {deletedData.bookDeleted.author}
        </p>
      )}
    </div>
  );
}

export default BookSubscriptions;
