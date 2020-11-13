import React, { useEffect, useState } from "react";
import axios from "axios";

const iniLoginForm = {
  username:'Lambda School',
  password:'i<3Lambd4'
}

const Login = (props) => {
  const [ loginForm, setLoginForm ] = useState(iniLoginForm)
  // make a post request to retrieve a token from the api
  const onSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:5000/api/login`, loginForm)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => {
      debugger
      console.log(err)
      console.log(err.response)
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name]:value
    })
  }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={onSubmit}>
        <label>
          <input 
          type='text'
          name='username'
          value={loginForm.username}
          onChange={onChange}
          />
        </label>
        <label>
          <input 
          type='password'
          name='password'
          value={loginForm.password}
          onChange={onChange}
          />
        </label>
        <div>
          <button>Login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
