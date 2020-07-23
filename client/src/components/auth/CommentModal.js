import React, {useEffect, useState} from 'react';
// import {connect} from 'react-redux';
import Modal from 'react-modal';

const today = () =>{
    return `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()} (${new Date().getHours()}:${new Date().getMinutes()})`;
};


const CommentModal = ({setTick, setComment, comments, newC}) => {
    const onAdd = () => {
        setTick({comments: [...comments, (`${today()} - ${document.getElementById('newComment').value.trim()}`)]});
        setComment({newC:false})
    }

    const onCancel = () => {
        setComment({newC:false})
    }

    return (
        <Modal
            isOpen={!!newC}
            onRequestClose={() => console.log('req close')}
            contentLabel=""
        >
            <div className='ticketModalForm'>
            <h2 className='text-primary'>
                New Comment
            </h2>
            </div>
            <br />
            <hr />
            <br />
            <div>
                <input
                    type='text'
                    name='newComment'
                    id='newComment'
                />
            </div>
            <br />
            <hr />
            <br />
            <div className="grid-2">
                <div>
                    <button onClick={onAdd}>
                        Add Comment
                    </button>
                </div>
                <div>
                    <button onClick={onCancel}>
                        Cancle/Exit
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CommentModal;
