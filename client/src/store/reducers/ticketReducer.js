import {
    COUNT_TICKETS,
    LOAD_OPEN_TICKETS,
    LOAD_CLOSED_TICKETS,
    LOAD_TICKET,
    CLEAR_TICKET,
    CLOSE_TICKET,
    UPDATE_TICKET
} from '../actions/types';

const initialState = {
    closedTickets: null,
    tickets: null,
    ticket: null,
    ticketCounts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_OPEN_TICKETS:
            return {
                ...state,
                tickets: action.payload
            };
        case LOAD_TICKET:
            return {
                ...state,
                ticket: action.payload
            };
        case CLEAR_TICKET:
            return {
                ...state,
                ticket: null
            };
        default:
      return state;
    }
};