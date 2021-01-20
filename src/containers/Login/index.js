import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './graphql'

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
    onCompleted: ({ login: { token } }) => {
      localStorage.setItem('token', token)
      history.push('/home')
    },
  })
  return (
    <>
      <h3>Welcome</h3>
      <p>Email</p>
      <input
        type="text"
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <p>Password</p>
      <input
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" onClick={login}>Login</button>
    </>
  )
}

export default Login
