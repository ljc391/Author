import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import {verifyUser} from '../redux/user';
import store from '../store';
import {setlogin} from '../redux/isLoggedIn';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={password:"", email:""};
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  // login(){
  //   console.log("email", email, "pwd", password);
  //   const body = JSON.stringify({email:email, password:password}),
  //         method = "POST",
  //         header = new window.Header({'Content-Type':"application/json"});
  //   //fetch('/users/login',{method, body, header});

  // }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onLoginSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input ref={(element) => { this.email =element}}
                    name="email"
                    type="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input ref={(element) => { this.password =element}}
                      name="password"
                      type="password"
                      className="form-control"
                      required
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary" onClick= {() =>{this.setState({email:this.email.value, password:this.password.value});}}>{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    const { message } = this.props;
    event.preventDefault();
    console.log("EMAIL", this.state.email);
    console.log("PWD", this.state.password);
    const user ={email: this.state.email, password: this.state.password};
    console.log("f",user);
    //setlogin()(store.dispatch);
    this.props.login(user);
    // verifyUser(user)(store.dispatch);
//    console.log(verifyUser(user));

  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' })
const mapDispatch = dispatch => ({
  login: (user) =>{
    dispatch(verifyUser(user));
  }
})

export default connect(mapState, mapDispatch)(Login);
