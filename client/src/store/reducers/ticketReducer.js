import {
    COUNT_TICKETS,
    LOAD_OPEN_TICKETS,
    LOAD_CLOSED_TICKETS,
    LOAD_TICKET,
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
            }
        default:
      return state;
  }
};