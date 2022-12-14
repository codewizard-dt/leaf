import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../utils/mutations';
import { ME } from '../utils/queries';

const SavedBooks = () => {
  const [userData, setUserData] = useState(null);
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const { loading } = useQuery(ME, {
    variables: { token },
    onCompleted: data => { console.log({ data }); setUserData(data.me || {}) }
  })
  const [removeBook] = useMutation(REMOVE_BOOK)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId }
      })
      // const response = await deleteBook(bookId, token);

      if (!data) {
        // if (!response.ok) {
        throw new Error('something went wrong!');
      }

      console.log(data)
      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userData) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
