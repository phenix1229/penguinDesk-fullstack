import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import Dropdown from '../layout/Dropdown';
import CommentModal from './CommentModal';
import ResolutionModal from './ResolutionModal';
import { clearTicket, updateTicket, editTicket, loadTicket, getTickets } from '../../store/actions/ticketActions';
import { getGroups, getUsers } from '../../store/actions/authActions';
import {loadUser} from '../../store/actions/authActions';

const TicketModal = ({ticketState:{ticket, edit}, auth:{groups, users}, clearTicket, updateTicket, editTicket, getGroups, getUsers, getTickets}) => {
    useEffect(() => {
        if (ticket !== null) {
          setTick(ticket);
        } else {
          setTick({
            ticketNumber:'',
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:[],
            resolution:''
          });
        }
        getGroups();
        getUsers();
      }, [ticket, edit, getUsers, getGroups]);
    
      const [tick, setTick] = useState({
            ticketNumber:'',
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:[],
            resolution:''
      });

      const [newComment, setNewComment] = useState ({
          newC:false
      })

      const {newC} = newComment;
    
      const {
        ticketNumber,
        openedBy,
        openDate,
        client,
        clientLocation,
        issue,
        status,
        assignedGroup,
        assignedTech,
        comments,
        resolution
      } = tick;
    
      const onChange = e =>
        setTick({ ...tick, [e.target.name]: e.target.value });
    
      const onSubmit = e => {
        e.preventDefault();
        if ( edit !== null) {
            updateTicket(tick);
            clearTicket();
            getTickets();
        } else {
        //   updateContact(contact);
        }
      };
    

    return(
    <Modal
    isOpen={!!ticket}
    onRequestClose={() => console.log('req close')}
    contentLabel=""
    >
  
  <div className='ticketModalForm'>
    <h2 className='text-primary'>
        {ticketNumber}
    </h2>
  </div>
  <br />
  <hr />
  <br />
  <div>
    <div className="grid-2">
        <div className='tmfColumnLeft'>
            <label>Client:</label>
            {edit &&
                <input
                    placeholder={client}
                    name='client'
                    defaultValue={client}
                    onChange={onChange}
                />
            }
            {edit === null &&
                <input
                    placeholder={client}
                    name='client'
                    readOnly={client}
                />
            }
        </div>
        <div className='tmfColumnRight'>
            <label>Open Date:</label>
            <input
                placeholder={openDate}
                name='openDate'
                readOnly={openDate}
            />
        </div>
    </div>
  </div>
  <div>
    <div className='grid-2'>
        <div className='tmfColumnLeft'>
            <label>Location:</label>
            { edit &&
                <input
                    placeholder={clientLocation}
                    name='clientLocation'
                    defaultValue={clientLocation}
                    onChange={onChange}
                />
            }
            { edit === null &&
                <input
                    placeholder={clientLocation}
                    name='clientLocation'
                    readOnly={clientLocation}
                />
            }
        </div>
        <div className='tmfColumnRight'>
            <label>Opened By:</label>
            <input
                placeholder={openedBy}
                name='openedBy'
                readOnly={openedBy}
                />
        </div>
    </div>
  </div>
  <div style={{width:"150px"}}>
        <label>Status:</label>
        <input
            placeholder={status}
            name='status'
            readOnly={status}
        />
  </div>
  <br />
  <hr />
  <br />
  <div>
        <label>Issue:</label>
        <input style={{width:"100%"}}
            placeholder={issue}
            name='issue'
            readOnly={issue}
        />
  </div>
  <div>
    <div className="grid-2">
        <div className='tmfColumnLeft'>
            <label>Assigned Group:</label>
            { edit && 
                <Dropdown title={'assignedGroup'} options={groups} onChange={onChange}/>
            }
            { edit === null &&
                <input
                    placeholder={assignedGroup}
                    name='assignedGroup'
                    readOnly={assignedGroup}
                />
            }
        </div>
        <div className='tmfColumnRight'>
        <label>Assigned Tech:</label>
            { edit && 
                <Dropdown title={'assignedTech'} options={users} onChange={onChange}/>
            }
            { edit === null &&
                <input
                    placeholder={assignedTech}
                    name='assignedTech'
                    readOnly={assignedTech}
                />
            }
        </div>
    </div>
    <br />
    <hr />
    <br />
    <div>
        <label>Comments:</label>
        <input style={{width:"100%"}}
            placeholder={comments}
            name='comments'
            readOnly={comments}
        />
        { edit && <button onClick={() => {setNewComment({newC:true})}}>Add Comment</button>}
    </div>
    <br />
    <hr />
    <br />
    </div>
    <div>
        {edit && <input type="submit" onClick={onSubmit} value="Save Changes"/>}
    </div>
    
    <div className="grid-2">
        <div>
            {edit === null &&
                <button onClick={() => editTicket(ticket)}>Edit Ticket</button>
            }
        </div>
        <div>
            <button onClick={() => {clearTicket(); getTickets()}}>Cancel/Exit</button>
        </div>
    </div>
    <CommentModal setComment={setNewComment} newC={newC} setTick={setTick} comments={comments} />
  </Modal>
);}

const mapStateToProps = (state) => ({
    ticketState: state.ticketReducer,
    auth: state.authReducer
    // alert: state.alertReducer
})

export default connect(mapStateToProps, {loadUser, clearTicket, updateTicket, editTicket, getTickets, getGroups, getUsers})(TicketModal);