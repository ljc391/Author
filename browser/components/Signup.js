import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import { createUser }  from '../redux/user';
import store from '../store';


/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state={email:"", password:""};
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onSignupSubmit}>
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
                <button type="submit" className="btn btn-block btn-primary" onClick={() =>{this.setState({email:this.email.value, password:this.password.value});}}>{message}</button>
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

  onSignupSubmit(event) {
    const { message } = this.props;
    event.preventDefault();
    const user ={email: this.state.email, password: this.state.password};

    createUser(user)(store.dispatch);
   // console.log(`${message} isn't implemented yet`);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' })
const mapDispatch = null

export default connect(mapState, mapDispatch)(Signup);
