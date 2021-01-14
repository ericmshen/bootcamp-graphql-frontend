import gql from 'graphql-tag'

const ALL_AUTHORS = gql`
  query allauthors {
    allAuthors {
        firstName
        lastName
        numBooksPublished
        books {
            title
        }
    }
  }
`

const ADD_AUTHOR = gql`
    mutation addAuthor($input: AddAuthorInput!) {
        addAuthor(input: $input) {
            firstName
            lastName 
        }
    }
`

export {
  ADD_AUTHOR,
  ALL_AUTHORS,
}
