import React from 'react';
import { connect } from'react-redux';
import { Link, browserHistory } from 'react-router';
import { logoutUser, setlogout }  from '../redux/user';
import store from '../store';



/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src="/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/users" activeClassName="active">users</Link>
              </li>
              <li>
                <Link to="/stories" activeClassName="active">stories</Link>
              </li>
            </ul>
            { this.props.user ? this.renderLogout() : this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    );
  }
  // get isLogin(){
  //   return !!this.props.user;
  // }
  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">

        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>

      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button className="navbar-btn btn btn-default"
          onClick={this.props.logout}>logout</button>
        </li>
      </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user }) => ({ user })

const mapDispatch = dispatch => ({
  logout: () => {
    console.log('You signed out. Sorta.')
    // setlogout()(store.dispatch);
    dispatch(logoutUser());
    browserHistory.push('/');
  }
})

export default connect(mapState, mapDispatch)(Navbar);
