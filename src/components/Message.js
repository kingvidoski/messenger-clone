import React, { forwardRef } from 'react';
import { Card } from '@mui/material';

const Message = forwardRef(({message, user}, ref) => {
    const isUser = user === message.username;

    return (
        <div ref={ref} className={`${!isUser ? 'cardFR' : 'card'}`}>
            <div className={`${!isUser ? 'cardFR_box' : 'card_box'}`}>
            <span>{!isUser && message.username}</span>
                <Card className={`${isUser ? 'message_user' : 'message_card'}`} variant="outlined" component="p">
                    {message.text}
                </Card>
                {!isUser && <img className='imgFR' src={message.photo} alt="me" />}
            </div>
        </div>
    )
})

export default Message
