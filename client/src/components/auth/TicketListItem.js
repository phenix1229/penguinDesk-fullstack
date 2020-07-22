import React from 'react';
import {connect} from 'react-redux';


const TicketListItem = ({props:{ticket}}) => {
    const {client, issue, openDate, assignedTech} = ticket;
    const desc = `${issue.slice(0, 30)}...`;

    return (
        <tr>
            <td style={{width:"100px"}}>{openDate}</td>
            <td style={{width:"175px"}}>{client}</td>
            <td>{issue}</td>
            <td style={{width:"175px"}}>{assignedTech}</td>
        </tr>
    )
};

const mapStateToProps = (state, ownProps) => ({
    auth: state.authReducer,
    props: ownProps
});

export default connect(mapStateToProps)(TicketListItem);