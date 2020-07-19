import axios from 'axios';
import {
    COUNT_TICKETS,
    LOAD_OPEN_TICKETS,
    LOAD_CLOSED_TICKETS,
    LOAD_TICKET,
    CLOSE_TICKET,
    UPDATE_TICKET

} from './types';

export const countTickets = () => async dispatch => {
    try {
        await axios.get('/tickets').then((tickets) => {
            let openTickets = 0;
            let closedTickets = 0;
            tickets.data.forEach((item) => {
                if(item.open === true){
                    openTickets++
                } else {
                    closedTickets++
                }
            });
            const result = [openTickets, closedTickets];

            dispatch ({
                type: COUNT_TICKETS,
                payload: result
            })
        })
    } catch (error) {
        
    }
};

export const loadOpenTickets = () => async dispatch =>{
    try {
        const res = await axios.get('/tickets').then((tickets) => {
            const openTickets = tickets.data.filter((item) => {
                return item.open === true
            })
        })

        dispatch ({
            type: LOAD_OPEN_TICKETS,
            payload: res
        })
    } catch (error) {
        
    }
    
};

export const loadClosedTickets = () => async dispatch => {
    try {
        const res = await axios.get('/tickets').then((tickets) => {
            const closedTickets = tickets.data.filter((item) => {
                return item.open === false
            })
        })

        dispatch ({
            type: LOAD_CLOSED_TICKETS,
            payload: res
        })
    } catch (error) {
        
    }
};

export const loadTicket = (id) => async dispatch => {
    try {
        const res = await axios.get(`/ticket/${id}`);

        dispatch ({
            type: LOAD_TICKET,
            payload: res.data
        })
    } catch (error) {
        
    }
};

export const closeTicket = (id) => async dispatch => {
    dispatch ({
        type: CLOSE_TICKET,
        payload: id
    })
};

export const updateTicket = (id) => async dispatch => {
    dispatch ({
        type: UPDATE_TICKET,
        payload: id
    })
};
handleChange = (event) => {
    this.setState({searchTerm:event.target.value}, ()=> {
    })
};
handleCreateTicketSubmit = (event,ticket) => {
    event.preventDefault();
    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.post('/ticket', ticket, axiosConfig).then(() => {
        this.setState({openTickets:true, closedTickets:false, updateTicket:false, createTicket:false, dashboard:false});
        this.loadOpenTickets();
        this.countTickets();
    });
};
handleUpdateTicketSubmit = (event, ticket, id) => {
    event.preventDefault();
    console.log(ticket)
    this.setState({
        createTicket: false
    });
    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`/ticket/${id}`, ticket, axiosConfig).then(() => {
        this.setState({openTickets:true, closedTickets:false, updateTicket:false, createTicket:false, closeTicket:false, dashboard:false, ticket:{}});
        this.loadOpenTickets();
    })
};
handleCloseTicketSubmit = (event, ticket, id) => {
    event.preventDefault();
    this.setState({
        createTicket: false
    });
    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`/ticket/${id}`, ticket, axiosConfig).then(() => {
        this.setState({openTickets:false, closedTickets:true, updateTicket:false, createTicket:false, closeTicket:false, dashboard:false, ticket:{}});
        this.loadClosedTickets();
        this.countTickets();
    })
};
handleCreateTicket = () => {
    this.setState({createTicket:true, openTickets:false, updateTicket:false, closedTickets:false, closeTicket:false, dashboard:false, ticket:{}})
};