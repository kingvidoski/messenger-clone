import React, { forwardRef } from 'react';
import { Card } from '@mui/material';

const Message = forwardRef(({message, user}, ref) => {
    

    return (
        <div ref={ref} className={`${!user ? 'cardFR' : 'card'}`}>
            <div className={`${!user ? 'cardFR_box' : 'card_box'}`}>
            <span>{!user && message.username}</span>
                <Card className={`${user ? 'message_user' : 'message_card'}`} variant="outlined" component="p">
                    {message.text}
                </Card>
                {!user && <img className='imgFR' src={message.photo} alt="me" />}
            </div>
        </div>
    )
})

export default Message
