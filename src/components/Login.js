import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLoginDetails } from '../features/user/UserSlice';
import { useLayoutEffect, useRef } from 'react';
import { TweenMax, TimelineLite, Power3 } from 'gsap';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const app = useRef();
    const content = useRef();
    let tl = new TimelineLite();
    
    useLayoutEffect(() => {
        const firstHeading = content.current.children[0].children[0];
        const secondHeading = content.current.children[0].children[1];
        const image = content.current.children[1].children[0];


        TweenMax.to(app.current, 0, { css: { visibility: 'visible' } });

        tl.fromTo(firstHeading, 1.2, { y: 120, ease: Power3.easeOut }, { y: 0 }, "-=0.8")
            .fromTo(secondHeading, 1.2, { y: 120, ease: Power3.easeOut }, { y: 0 }, "-=0.7")
            .fromTo(image, 1.2, { x: 70, ease: Power3.easeOut }, { x: 0 }, "-=1.2")
    })

    const handleLogin = () => {
        auth.signInWithPopup(provider).then((result) => {
            setUser(result.additionalUserInfo.profile);
            navigate("/chat");
        }).catch((error) => {
            alert(error.message);
        });
    }

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.name,
                email: user.email,
                photo: user.picture.data.url,
            })
        )
    };



    return (
    <Container ref={app}>
        <section ref={content}>
            <Hero>
                <h1>Hang out anytime, anywhere</h1>
                <p>Messenger makes it easy and fun to stay close to your favourite people</p>
            </Hero>
            <HeroImg><img src="https://z-p3-scontent.flos1-2.fna.fbcdn.net/v/t39.8562-6/120973513_338186077283942_8148888802958728934_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=peBUQ1t2y7QAX-AevMW&_nc_ht=z-p3-scontent.flos1-2.fna&oh=00_AT_DlPC8URAWpWeXuYjzKYmbP0Xe3twIMLq8_FtwGzDlVw&oe=628F0B27" alt="Hero" /></HeroImg>
        </section>
        <LoginBtn onClick={handleLogin}>Login</LoginBtn>
    </Container>
    )
}

const Container = styled.main`
    max-width: 90%;
    height: 78vh;
    padding: 0 5px;
    margin: 0 auto;
    visibility: hidden;
    position: relative;
    top: 50px;
    left: 0;
    overflow: hidden;
    
    @media screen  and (max-width: 768px){
        padding-bottom: 30px;
        height: fit-content;
        display: flex;
        flex-flow: column;
        overflow: visible;
    }
`;

const Hero = styled.div`
    max-width: 45%;

    @media screen and (max-width: 768px){
            max-width: 100%;
            margin-bottom: 20px;
        }

    h1{
        font-size: 84px;
        line-height: 1.1;
        letter-spacing: -4px;
        background-clip: text;
        background: -webkit-linear-gradient(1.84deg, #0088ff -6.87%, #a033ff 26.54%, #ff5c87 58.58%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media screen and (max-width: 768px){
            font-size: 40px;
        }

        @media screen and (max-width: 400px){
            font-size: 32px;
            letter-spacing: 1px;
        }
    }

    p{
        font-size: 20px;
        color: #595959;
        margin-top: 25px;
        max-width: 500px;

        @media screen and (max-width: 768px){
            font-size: 14px;
        }
    }
`;

const HeroImg = styled.div`
    max-width: 600px;
    margin-top: -20px;

    img{
        width: 100%;
    }
`;


const LoginBtn = styled.button`
    font-size: 19px;
    color: #fff;
    margin-top: 35px;
    padding: 10px 20px;
    border: 0;
    border-radius: 20px;
    background: #0a7cff;
    cursor: pointer;

    &:hover{
        transform: scale(1.1);
        box-shadow: rgb(0 0 0 / 29%) 0px 26px 30px -10px, rgb(0 0 0 / 53%) 0px 16px 10px -10px;
    }

    @media screen  and (max-width: 768px){
        &:hover{
        background: #0bbcff;
        transform: scale(1);
        transition-duration: 3ms;
    }
    }
`;

export default Login
