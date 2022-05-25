import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserPhoto } from '../features/user/UserSlice';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeblurIcon from '@mui/icons-material/Deblur';
import MicIcon from '@mui/icons-material/Mic';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

const Animate = ({name}) => {
    const style = { '--i': 0 };
    const style1 = { '--i': 1 };
    const style2 = {'--i': 2};
    const style3 = { '--i': 3 };
    const style4 = {'--i': 4};
    const style5 = { '--i': 5 };
    const style6 = {'--i': 6};
    const style7 = {'--i': 7};

    const photo = useSelector(selectUserPhoto);

    return (
    <Container>
        <h1>Welcome <br /> <span>{name}</span></h1>
        <Loader>
            <span style={style} ><PermPhoneMsgIcon /></span>
            <span style={style1} ><InterpreterModeIcon /></span>
            <span style={style2} ><MicIcon /></span>
            <span style={style3} ><CollectionsIcon /></span>
            <span style={style4} ><DeblurIcon /></span>
            <span style={style5} ><VideocamIcon /></span>
            <span style={style6} ><ChatIcon /></span>
            <span style={style7} ><img src={photo} alt="" /></span>
        </Loader>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    h1{
        position: absolute;
        font-size: 16px;

        span{
            font-weight: 100;
            font-size: 12px;
        }
    }
`;

const Loader = styled.div`
    position: relative;
    top: -2px;
    left: -90px;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: -50px;
        transform-origin: 70px;
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 50%;
        animation: animate 5s ease-in-out infinite;
        animation-delay: calc(0.15s * var(--i));

        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        @media screen and (max-width: 400px){
            transform-origin: -20px;
        }
    }

    @keyframes animate{
        0%,10% 
        {
            width: 50px;
            height: 50px;
            transform: rotate(0deg) translateX(120px);
        }
        40%,70%
        {
            width: 20px;
            height: 20px;
            transform: rotate(calc(360deg / 8 * var(--i)));
            box-shadow: 0 0 0 10px #fff;
        }
        90%,100% 
        {
            width: 50px;
            height: 50px;
            transform: rotate(0deg) translateX(120px);
        }
    }

`;
export default Animate
