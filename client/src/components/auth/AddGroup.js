import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {clearErrors, addGroup, getGroups, getUsers} from '../../store/actions/authActions';
import {setAlert} from '../../store/actions/alertActions';
import Dropdown from '../layout/Dropdown';


const AddGroup = ({auth:{error, groups}, addGroup, clearErrors, setAlert, getGroups, getUsers}) => {

  useEffect(() => {
    if (error === 'Group already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    getGroups();
    getUsers();
    // eslint-disable-next-line
  }, [error, history, getGroups, getUsers]
  );

    const [group, setGroup] = useState({
        name:''
    });

    const {name} = group;
    
    const onChange = e => setGroup({...group, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (name === '') {
            setAlert('Please enter a group name', 'danger');
          } else {
            addGroup({
                name,
            });
          }
    }

    return (
        <div className="form-container">
        <h1>
            Account <span className="text-primary">Add Group</span>
        </h1>
        <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Group:</label>
              <Dropdown title={'Group'} options={groups} />
            </div>
            <div className="form-group">
              <label>Members:</label>
              <Dropdown title={'members'} options={users} />
            </div>
            <input type="submit" value="addGroup" className="btn btn-primary btn-block" onClick={onSubmit} />
        </form>
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    alert: state.alertReducer
})

export default connect(mapStateToProps, {addGroup, clearErrors, setAlert, getGroups, getUsers})(AddGroup);