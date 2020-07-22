import React from 'react';
import {connect} from 'react-redux';
import {loadTicket} from '../../store/actions/ticketActions';


const TicketListItem = ({props:{ticket}, loadTicket}) => {
    const {client, issue, openDate, assignedTech} = ticket;
    const desc = `${issue.slice(0, 30)}...`;
    // const log = () => console.log(ticket)

    return (
        <tr onClick={() => loadTicket(ticket)}>
            <td style={{width:"100px"}}>{openDate}</td>
            <td style={{width:"175px"}}>{client}</td>
            <td>{issue}</td>
            <td style={{width:"175px"}}>{assignedTech}</td>
        </tr>
    )
};

const mapStateToProps = (state, ownProps) => ({
    ticketState: state.ticketReducer,
    props: ownProps
});

export default connect(mapStateToProps, {loadTicket})(TicketListItem);