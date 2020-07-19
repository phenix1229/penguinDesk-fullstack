import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearErrors, register} from '../../store/actions/authActions';
import {setAlert} from '../../store/actions/alertActions';


const Register = ({auth:{isAuthenticated, error}, props:{history}, register, clearErrors, setAlert}) => {

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]
  );

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name, email, password, password2} = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
          } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
          } else {
            register({
              name,
              email,
              password
            });
          }
    }

    return (
        <div className="form-container">
        <h1>
            Account <span className="text-primary">Register</span>
        </h1>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2" value={password2} onChange={onChange} />
            </div>
            <input type="submit" value="Register" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    alert: state.alertReducer,
    props: ownProps
})

export default connect(mapStateToProps, {register, clearErrors, setAlert})(Register);