import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import TicketListItem from './TicketListItem';
import {getTickets} from '../../store/actions/ticketActions';


const TicketList = ({auth:{user, view}, ticketState:{tickets}, getTickets}) => {
    useEffect(() => {
        getTickets()
        // eslint-disable-next-line
    }, [view]);

    if(tickets === null || tickets.length === 0){
        return <h4>No Tickets</h4>
    }

    const ticketList = view === 'groupTickets' ? 
        tickets.filter(ticket => ticket.assignedGroup === user.group) :
        tickets.filter(ticket => ticket.assignedTech === user.email);

    return (
        <div className="library">
                {ticketList.map(ticket => 
                    <TicketListItem key={ticketList.indexOf(ticket)} ticket={ticket} />)
        }
        </div>
    )
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    ticketState: state.ticketReducer
});

export default connect(mapStateToProps, {getTickets})(TicketList);