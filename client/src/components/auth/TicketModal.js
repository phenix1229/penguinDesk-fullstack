import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
// import {loadTicket} from '../../store/actions/ticketActions';
import Modal from 'react-modal';
import { clearTicket } from '../../store/actions/ticketActions';

const TicketModal = ({ticketState:{ticket}, clearTicket}) => {
    useEffect(() => {
        if (ticket !== null) {
          setTick(ticket);
        } else {
          setTick({
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            issueType:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:'',
            resolution:''
          });
        }
      }, [ticket]);
    
      const [tick, setTick] = useState({
            openedBy:'',
            openDate:'',
            client:'',
            clientLocation:'',
            issue:'',
            issueType:'',
            status:'',
            assignedGroup:'',
            assignedTech:'',
            comments:'',
            resolution:''
      });
    
      const {
        openedBy,
        openDate,
        client,
        clientLocation,
        issue,
        issueType,
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
        if (ticket === null) {
        //   addContact(contact);
        } else {
        //   updateContact(contact);
        }
        clearAll();
      };
    
      const clearAll = () => {
        clearTicket();
      };
    

    return(
    <Modal
    isOpen={!!ticket}
    onRequestClose={() => console.log('req close')}
    contentLabel=""
  >
  


  


    <form>
      <h2 className='text-primary'>
        kjbkjb
      </h2>
      <input
        type='text'
        placeholder='openDate'
        name='openDate'
        value={'openDate'}
         
      />
      <input
        
        placeholder='Email'
        name='email'
        value={'email'}
         
      />
      <input
       
        placeholder='Phone'
        name='phone'
        value={'phone'}
         
      />
      <h5>Contact Type</h5>
      <input
       
        name='type'
        value='personal'
        checked={'personal'}
         
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={'professional'}
         
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
        <div>
          <button className='btn btn-light btn-block'>
            Clear
          </button>
        </div>
    </form>
  
    <button onClick={() => clearTicket()}>Okay</button>
  </Modal>
);}

const mapStateToProps = (state) => ({
    ticketState: state.ticketReducer,
    // alert: state.alertReducer
})

export default connect(mapStateToProps, {clearTicket})(TicketModal);