import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as routes from '../constants/routes'
import { auth } from '../firebase'

const SignUpPage = ({history}) => 
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {...initialState}
  }

  onSubmit = event => {
    event.preventDefault()
    const { username, email, passwordOne } = this.state
    const currentState = this.state
    const { history } = this.props
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({...initialState})
        history.push(routes.HOME)
      })
      .catch(error => this.setState({...currentState, error}))
  }

  onChange = event => this.setState({[event.target.id]: event.target.value})

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input value={username} id="username" onChange={this.onChange} type="text" placeholder="username" />
        <input value={email} id="email" onChange={this.onChange} type="text" placeholder="email" />
        <input value={passwordOne} id="passwordOne" onChange={this.onChange} type="text" placeholder="passwordOne" />
        <input value={passwordTwo} id="passwordTwo" onChange={this.onChange} type="text" placeholder="passwordTwo" />
        <button disabled={isInvalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () =>
  <p>Don't have an account?{" "}<Link to={routes.SIGN_UP}>Sign Up</Link></p>

export default withRouter(SignUpPage)

export {
  SignUpForm,
  SignUpLink
}