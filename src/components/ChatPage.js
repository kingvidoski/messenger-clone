import { useEffect, useState } from "react";
import styled from 'styled-components';
import { FormControl, Input } from '@mui/material';
import Message from "./Message";
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../features/user/UserSlice';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import db from '../firebase';
import firebase from "firebase/compat/app";
import Animate from "./Animate";
import FlipMove from 'react-flip-move';
import ReactScrollableFeed from 'react-scrollable-feed';

const ChatPage = () => {
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const userName = useSelector(selectUserName);
    const photo = useSelector(selectUserPhoto);

    useEffect(() => {
        db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()})))
        })
    }, [input]);


    useEffect(() => {
        setName(userName);
    }, [userName]);



    const sendMessage = (e) => {
    e.preventDefault();
        db.collection('messages').add({
            username: userName,
            text: input,
            photo: photo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    setInput("");
    }

    return (
    <Container>
        <Animate name={name} />
        <div className="container">
            <form id="button">
                <FormControl className='input-box'>
                    <Input className='input-field' placeholder='Type a message' onChange={(e)=> setInput(e.target.value)} value={input} />
                    <IconButton className='input-btn' variant="contained" type="submit" disabled={!input} onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>
            <ReactScrollableFeed>
            <FlipMove>
                {
                    messages.map((chat) => {
                        return <Message key={chat.id} message={chat.message} user={userName} photo={photo} />
                    })
                }
            </FlipMove>
            </ReactScrollableFeed>
        </div>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
`;

export default ChatPage
