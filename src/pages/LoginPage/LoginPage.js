import React, { Component } from 'react';
import axios from 'axios';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userData: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();


    const { email, password, userData } = this.state;

    const headers = {
      authorization: 'Basic ' + btoa(email + ':' + password)
    };

    axios.get('http://localhost:8080/auth/login', {
      headers: headers
    })
      .then(res => {
        console.log(res)
        this.setState({ userData: res.data.token })
      }, error => {
        console.log(error)
      })
  }
  render() {

    const { userData } = this.state;

    return (

      <div>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <input type="text" onChange={e => this.setState({ email: e.target.value })} />
          <input type="text" onChange={e => this.setState({ password: e.target.value })} />
          <button type="submit">Login</button>
        </form >



        <button disabled={!userData} >User logged in</button>

      </div >
    );
  }
}

export default LoginPage;
