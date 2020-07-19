import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, loadUser} from '../../store/actions/authActions';


const Navbar = ({ auth:{isAuthenticated, user}, logout, loadUser }) => {

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='localhost:3000/login'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <img src='logoMain.png' id="logo" alt="" style={{width:"200px", margin:"none"}} />
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
    auth: state.authReducer
  })
  
  export default connect(mapStateToProps, {logout, loadUser})(Navbar)