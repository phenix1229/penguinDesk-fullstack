countTickets = () => {
    axios.get('/tickets').then((tickets) => {
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
        this.setState({ticketCounts: result});
    })
};
loadOpenTickets = () => {
    axios.get('/tickets').then((tickets) => {
        const openTickets = tickets.data.filter((item) => {
            return item.open === true
        })
        this.setState({tickets: openTickets, openTickets:true, closedTickets:false, createTicket:false, updateTicket:false, closeTicket:false, dashboard:false, ticket:{}})
    })
};
loadClosedTickets = () => {
    axios.get('/tickets').then((tickets) => {
        const closedTickets = tickets.data.filter((item) => {
            return item.open === false
        })
        this.setState({tickets: closedTickets, openTickets:false, closedTickets:true, createTicket:false, updateTicket:false, closeTicket:false, dashboard:false, ticket:{}})
    })
};
loadTicket = (id) => {
    axios.get(`/ticket/${id}`).then((ticket) => {
        this.setState({
            createTicket: false,
            openTickets: false,
            closedTickets: false,
            dashboard:false,
            ticket: ticket.data
        })
    })
};
onDelete = (id) => {
    axios.delete(`/ticket/${id}`).then(() => {
        this.loadOpenTickets();
    })
};
handleCloseTicket = (id) => {
    this.loadTicket(id);
    this.setState({updateTicket:false, closeTicket:true});
};
onUpdate = (id) => {
    this.loadTicket(id);
    this.setState({updateTicket:true, closeTicket:false});
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