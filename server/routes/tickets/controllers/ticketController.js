const Ticket = require('../../../models/Ticket');

module.exports = {
    createTicket:(req, res) => {
        const newTicket = new Ticket();
        newTicket.openedBy = req.body.openedBy;
        newTicket.client = req.body.client;
        newTicket.issue = req.body.issue;
        // newTicket.comments = req.body.comments;
        // newTicket.resolution = req.body.resolution;
        newTicket.status = req.body.status;
        // newTicket.closedBy = req.body.closedBy;
        // newTicket.closeDate = req.body.closeDate;
        newTicket.assignedTech = req.body.assignedTech;
        newTicket.assignedGroup = req.body.assignedGroup;
        newTicket.save().then((ticket) => {
            return res.json(ticket);
        });
    },

    getTickets:(req, res) => {
        Ticket.find({})
        .then((tickets) => {
            tickets.reverse();
            return res.json(tickets.filter(item => item.status === 'Open'));
        });
    },

    getTicket:(req, res) => {
        Ticket.findById({ _id: req.params.id }).then((ticket) => {
            return res.json(ticket);
        });
    },

    updateTicket:(req, res) => {
        Ticket.findById({ _id: req.params.id }).then((ticket) => {
            ticket.open = req.body.open ? req.body.open : ticket.open;
            ticket.resolution = req.body.resolution ? req.body.resolution : ticket.resolution;
            ticket.comments = req.body.comments ? req.body.comments : ticket.comments;
            ticket.closedBy = req.body.closedBy ? req.body.closedBy : ticket.closedBy;
            ticket.closeDate = req.body.closeDate ? req.body.closeDate : ticket.closeDate;
            ticket.save().then((ticket) => res.json(ticket));
        });
    }
}