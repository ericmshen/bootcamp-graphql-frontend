import React from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ADD_AUTHOR, ALL_AUTHORS } from './graphql'

const Home = () => {
  // const { data, loading, error } = useQuery(ALL_AUTHORS)
  const [authors, {
    data, loading, error, called,
  }] = useLazyQuery(ALL_AUTHORS)
  if (error) {
    throw new Error('query failed')
  }
  const [addAuthor, { error: AddAuthorError }] = useMutation(ADD_AUTHOR, {
    variables: {
      input: {
        firstName: 'Asdf',
        lastName: 'Jkl',
        age: 53,
        email: 'asdfghjkl@asdf.co',
        numBooksPublished: 1,
        address: {
          street: 'St st',
          city: 'Townsville',
          state: 'State st',
          zip: '66556',
        },
      },
    },
    refetchQueries: () => [{ query: ALL_AUTHORS }],
  })
  if (AddAuthorError) {
    throw new Error('could not add')
  }
  return (
    <>
      <button type="button" onClick={addAuthor}>add</button>
      <button type="button" onClick={authors}>show</button>

      {!called || loading ? 'loading...' : data.allAuthors.map(author => (
        <>
          <p>
            {author.firstName}
            {' '}
            {author.lastName}
          </p>
          <p>{author.numBooksPublished}</p>
          <p>{author.books ? author.books.map(x => x.title) : 'no books yet'}</p>
        </>
      ))}
    </>
  )
}

export default Home
