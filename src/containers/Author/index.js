/* eslint-disable react/prop-types */
import React from 'react'

const Author = props => {
  const {
    author: {
      firstName, lastName, numBooksPublished, books,
    },
  } = props
  return (
    <>
      <p>
        {firstName}
        {' '}
        {lastName}
      </p>
      <p>{numBooksPublished}</p>
      <p>{books ? books.map(x => `${x.title} `) : 'no books yet'}</p>
    </>
  )
}

export default Author
