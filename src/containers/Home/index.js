import React, { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Author from '../Author'
import { ADD_AUTHOR, ALL_AUTHORS } from './graphql'

const Home = () => {
  // const { data, loading, error } = useQuery(ALL_AUTHORS)
  const history = useHistory()
  const token = localStorage.getItem('token')
  if (!token) {
    history.push('/')
  }
  const [author, setAuthor] = useState({
    firstName: 'Place', lastName: 'Holder', age: 1, email: 'placeholder@text.com', numBooksPublished: 0,
  })
  const [address, setAddress] = useState({
    street: 'Place', city: 'Hol', state: 'Der', zip: '00000',
  })
  const [authors, {
    data, loading, error, called,
  }] = useLazyQuery(ALL_AUTHORS)
  if (error) {
    throw new Error('query failed')
  }
  const [addAuthor, { error: AddAuthorError }] = useMutation(ADD_AUTHOR, {
    variables: {
      input: {
        firstName: author.firstName,
        lastName: author.lastName,
        age: author.age,
        email: author.email,
        numBooksPublished: author.numBooksPublished,
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
      },
    },
    update: (client, { clientdata }) => {
      try {
        const temp = client.readQuery({ query: ALL_AUTHORS })
        temp.allAuthors = [...temp.allAuthors, clientdata.addAuthor]
        client.writeQuery({ query: ALL_AUTHORS, temp })
      } catch (err) {
        throw new Error('Unexpected error')
      }
    },
  })
  if (AddAuthorError) {
    throw new Error('could not add')
  }
  return (
    <>
      <h2>Add an author...</h2>
      <form>
        <input type="text" placeholder="First Name" onChange={e => setAuthor({ ...author, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name" onChange={e => setAuthor({ ...author, lastName: e.target.value })} />
        <input type="number" placeholder="Age" onChange={e => setAuthor({ ...author, age: parseInt(e.target.value, 10) })} />
        <input type="text" placeholder="Email" onChange={e => setAuthor({ ...author, email: e.target.value })} />
        <input type="number" placeholder="Number of Books Published" onChange={e => setAuthor({ ...author, numBooksPublished: parseInt(e.target.value, 10) })} />
        <input type="text" placeholder="Street" onChange={e => setAddress({ ...address, street: e.target.value })} />
        <input type="text" placeholder="City" onChange={e => setAddress({ ...address, city: e.target.value })} />
        <input type="text" placeholder="State" onChange={e => setAddress({ ...address, state: e.target.value })} />
        <input type="text" placeholder="Zip Code" onChange={e => setAddress({ ...address, zip: e.target.value })} />
        <button type="button" onClick={addAuthor}>add</button>
      </form>
      <button type="button" onClick={authors}>show</button>

      {!called || loading ? 'loading...' : data.allAuthors.map(a => (
        <>
          {/* <p>
            {a.firstName}
            {' '}
            {a.lastName}
          </p>
          <p>{a.numBooksPublished}</p>
          <p>{a.books ? a.books.map(x => x.title) : 'no books yet'}</p> */}
          <Author author={a} />
        </>
      ))}
    </>
  )
}

export default Home
