import React from 'react';
import {connect} from 'react-redux';


const TicketListItem = ({props:{ticket}}) => {
    const {client, issue, openDate, assignedTech} = ticket;
    const desc = `${issue.slice(0, 30)}...`;

    return (
        <div className="card bg-light">
            <h3 className="text primary text-left">
                {client}
            </h3>
            <ul className="list">
                <li>{openDate}</li>
                <li>{desc}</li>
                <li>{assignedTech}</li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    props: ownProps
});

export default connect(mapStateToProps)(TicketListItem);