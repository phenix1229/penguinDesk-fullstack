import React , {Component} from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import CreateTicket from './CreateTicket';
import Tickets from './Tickets';
import UpdateTicket from './UpdateTicket';
import CloseTicket from './CloseTicket';
import Sidebar from './Sidebar';
import LoginForm from './LoginForm';
import './index.css';


class App extends Component {
    constructor(){
        super()
        this.state = {
            loggedIn: false,
            dashboard: false,
            openTickets: false,
            closedTickets: false,
            createTicket: false,
            updateTicket: false,
            searchTerm: '',
            tickets: [],
            ticket: {},
            ticketCounts: [],
            userObject:{}
        };
    };
    updateUser = (user) => {
        this.countTickets();
        this.setState({
        loggedIn: true,
        userObject: user,
        dashboard: true
        })
    };
    logoutUser = () => {
            this.setState({
                loggedIn: false,
                openTickets: false,
                createTicket: false,
                closedTickets: false,
                updateTicket: false,
                closeTicket: false,
                dashboard: false,
                tickets: [],
                ticket: {},
                userObject: {}
        })
    };
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
    componentDidMount(){
        // this.loadOpenTickets();
    };
    render () {
        if(this.state.loggedIn){
        return (
            <div id='app'>
                <Sidebar handleChange={this.handleChange} searchTerm={this.state.searchTerm} handleCreateTicket={this.handleCreateTicket} loadOpenTickets={this.loadOpenTickets} loadClosedTickets={this.loadClosedTickets} logoutUser={this.logoutUser} dashboard={this.state.dashboard} counts={this.state.ticketCounts} />
                <div id='main' style={{
                    justifyContent:'center', 
                    alignItems: 'center', 
                }}>
                    {this.state.dashboard ? (<Dashboard countTickets={this.countTickets} dashboard={this.state.dashboard} counts={this.state.ticketCounts} />) : null}
                    {this.state.createTicket ? (<CreateTicket handleCreateTicketSubmit={this.handleCreateTicketSubmit} user={this.state.userObject}  />) : null}
                    {this.state.updateTicket ? (<UpdateTicket handleUpdateTicketSubmit={this.handleUpdateTicketSubmit} ticket={this.state.ticket} />) : null}
                    {this.state.closeTicket ? (<CloseTicket handleCloseTicketSubmit={this.handleCloseTicketSubmit} ticket={this.state.ticket} user={this.state.userObject} />) : null}
                    {this.state.openTickets ? (<Tickets tickets={this.state.tickets} searchTerm={this.state.searchTerm} handleCloseTicket={this.handleCloseTicket} onUpdate={this.onUpdate} />) : null}
                    {this.state.closedTickets ? (<Tickets tickets={this.state.tickets} searchTerm={this.state.searchTerm} onDelete={this.onDelete} onUpdate={this.onUpdate} />) : null}
                </div>
            </div>
        )
            } else {
                return (
                    <LoginForm updateUser={this.updateUser} />
                )
            }
    };
};

export default App;