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

export const getTickets = () => async dispatch =>{
    try {
        console.log('action')
        const res = await axios.get('api/tickets')

        dispatch ({
            type: LOAD_OPEN_TICKETS,
            payload: res.data
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

export const newTicket = (ticket) => async dispatch => {

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    try {
        axios.post('api/tickets', ticket, axiosConfig)
            // this.countTickets();
    } catch (error) {
        
    }
    
};

export const updateTicket = (ticket, id) => async dispatch => {

    console.log(ticket)

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`/ticket/${id}`, ticket, axiosConfig)
};

export const closeTicket = (ticket, id) => async dispatch => {

    let axiosConfig = {
        headers:{
            'Content-Type':'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*'
        }
    };
    axios.put(`/ticket/${id}`, ticket, axiosConfig)
        // this.countTickets();
};