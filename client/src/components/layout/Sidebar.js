import React from 'react';
import {connect} from 'react-redux';
import {setView} from '../../store/actions/authActions';
import Search from './Search';
// import Dashboard from '../Dashboard';


const Sidebar = ({setView}) => {


        return (
            <>
                <Search />
                <br /> 
                <button className="ui primary button" style={{ backgroundColor:'#F2F2F2', color:'rgb(107, 105, 105)', marginBottom:'10px'}} onClick={() => setView('register')}>
                    <h3>New User</h3>
                </button>
                <button className="ui primary button" style={{ backgroundColor:'#F2F2F2', color:'rgb(107, 105, 105)', marginBottom:'10px'}} >
                    <h3>New Ticket</h3>
                </button>
                <button className="ui primary button" style={{ backgroundColor:'#F2F2F2', color:'rgb(107, 105, 105)', marginBottom:'10px'}} >
                    <h3>Open Tickets</h3>
                </button>
                <button className="ui primary button" style={{ backgroundColor:'#F2F2F2', color:'rgb(107, 105, 105)', marginBottom:'10px'}} >
                    <h3>Closed Tickets</h3>
                </button>
                <button className="ui primary button" style={{ backgroundColor:'#F2F2F2', color:'rgb(107, 105, 105)'}} >
                    <h3>Logout</h3>
                </button>
            </>
        )
}


const mapStateToProps = (state) => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {setView})(Sidebar);