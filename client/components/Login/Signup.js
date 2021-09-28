import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { authenticateSignup } from '../../store'

const Signup = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.id)
  const [usernames, setUsernames] = useState({})
  const [userEmails, setUserEmails] = useState({})
  const [userInput, setUserInput] = useState({
    user: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: ''
    },
    errors: {}
  })
  useEffect(() => {
    let mounted = true
    async function fetchUsers() {
      const uname = {}
      const email = {}
      // TODO this does not have a way to authorize!!
      const response = await axios('/api/users')
      response.data.forEach(user => {
        uname[user.username] = user.username
        email[user.email] = user.email
      })
      if (mounted) {
        setUsernames(uname)
        setUserEmails(email)
      }
    }
    fetchUsers()
    return () => {
      mounted = false
    }
  }, [])
  const handleSubmit = evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const user = {
      email: evt.target.email.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      username: evt.target.username.value,
      password: evt.target.password.value
    }
    dispatch(authenticateSignup(user, formName))
  }
  const handleChange = evt => {
    let errors = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: ''
    }
    if (!userInput.user.firstName) {
      errors.firstName = `first name field can not be empty`
    }
    if (!userInput.user.lastName) {
      errors.lastName = 'put your last name !'
    }
    if (!userInput.user.username) {
      errors.username = 'How can you login without username?'
    } else if (userInput.user.username in usernames) {
      errors.username = 'user already exist!'
    }
    if (!userInput.user.password) {
      errors.password = '????? please write your password.'
    }
    if (!userInput.user.email) {
      errors.email = 'email please!'
    } else if (userInput.user.email in userEmails) {
      errors.email = 'Email already exist!'
    }
    setUserInput({
      user: { ...userInput.user, [evt.target.name]: evt.target.value },
      errors
    })
  }

  return (
    <div className="login">
      {isLoggedIn ? (
        <Redirect to="/home" />
      ) : (
        <div className="loginbody">
          <div className="signupTitle">
            <h2>Signup your account</h2>
          </div>
          <form id="signupform" onSubmit={handleSubmit} name="signup">
            <div className="emailBox">
              <input
                className="email"
                name="email"
                type="text"
                onChange={handleChange}
                placeholder="Email"
              />
              {userInput.errors != '' && <span className="error">{userInput.errors.email}</span>}
            </div>
            <div className="emailBox">
              <input
                className="email"
                name="firstName"
                type="text"
                onChange={handleChange}
                placeholder="Frist Name"
              />
              {userInput.errors != '' && (
                <span className="error">{userInput.errors.firstName}</span>
              )}
            </div>
            <div className="emailBox">
              <input
                className="email"
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                type="text"
              />
              {userInput.errors != '' && <span className="error">{userInput.errors.lastName}</span>}
            </div>
            <div className="emailBox">
              <input
                className="email"
                name="username"
                type="text"
                onChange={handleChange}
                placeholder="Username"
              />
              {userInput.errors != '' && <span className="error">{userInput.errors.username}</span>}
            </div>
            <div className="emailBox">
              <input
                className="email"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
              {userInput.errors != '' && <span className="error">{userInput.errors.password}</span>}
            </div>
            <div className="signupBox">
              <button className="signupPage" name="button1">
                sign up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default Signup
