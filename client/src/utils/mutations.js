import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email:String!,$password:String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`
export const ADD_USER = gql`
  mutation addUser($username:String!, $email:String!,$password:String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
      }
    }
  }
`
export const SAVE_BOOK = gql`
  mutation saveBook($book:BookInput){
    saveBook(book:$book){
      _id
      savedBooks {
        _id
        title
        bookId
      }
    }
  }
`
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!) {
    removeBook(bookId:$bookId) {
      _id
      savedBooks {
        _id
        title
        bookId
      }
    }
  }
`