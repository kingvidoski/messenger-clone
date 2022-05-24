import styled from 'styled-components';
import { selectUserName, selectUserPhoto } from '../features/user/UserSlice';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignOutState } from '../features/user/UserSlice';

const Header = () => {
    const user = useSelector(selectUserName);
    const photo = useSelector(selectUserPhoto);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            dispatch(setSignOutState());
            navigate("/");
        }).catch(err => alert(err.message));
    };

    return (
    <Container>
        <nav>
            <Logo>
                <a href="/">
                    <img src="https://z-p3-scontent.flos2-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=6825c5&_nc_ohc=FSe2MNh0mCEAX8o_I-c&_nc_ht=z-p3-scontent.flos2-1.fna&oh=00_AT_XHSv56ToIiepSvgBj-q4hHR_tLDrsB11hbTA1IlTMbQ&oe=628F51FD" alt="" />
                </a>
            </Logo>
            {
                user ?
                    <Profile><img src={photo} alt="profile pic" />
                        <SignOut onClick={handleSignOut}>Sign out</SignOut>
                    </Profile>
                    :
                    <MenuBar>
                        <div className='bar'></div>
                        <NavMenu>
                            <li><a href="#"><span>Features</span></a></li>
                            <li><a href="#"><span>Desktop App</span></a></li>
                            <li><a href="#"><span>Privacy & Safety</span></a></li>
                            <li><a href="#"><span>For Developers</span></a></li>
                        </NavMenu>
                    </MenuBar>
            }
        </nav>
    </Container>
    )
}

const Container = styled.div`
    max-width: 90%;
    padding-right: 35px;
    margin: 0 auto;
`;

const Logo = styled.div`
    height: 72px;
    display: flex;
    align-items: center;
    img{
        width: 55px;

        @media screen and (max-width: 768px){
            width: 35px;
        }
    }
`;

const NavMenu = styled.ul`
    height: 72px;
    display: flex;
    align-items: center;
    gap: 30px;

    li>a{
        span{
        font-weight: 700;
        white-space: nowrap;
        position: relative;

            &:before{
                content: "";
                width: 100%;
                height: 2px;
                position: absolute;
                left: 0;
                bottom: -6px;
                background-color: #0a7cff;
                border-radius: 0 0 4px 4px;
                opacity: 0;
                visibility: hidden;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
    }

        &:hover{
            span:before{
                visibility: visible;
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`;

const MenuBar = styled.div`

    .bar{
        width: 1.5rem;
        height: 4px;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 2px;
        display: none;
        position: relative;
        transition: 0.5s;
        cursor: pointer;

        &:before, &:after{
            content: '';
            width: 100%;
            height: 4px;
            background-color: rgba(0, 0, 0, 0.8);
            position: absolute;
            border-radius: 2px;
        }

        &:before{
            transform: translateY(-9px);
        }

        &:after{
            transform: translateY(9px);
        }
    }

    @media screen and (max-width: 768px){
        position: relative;

        .bar{
            display: block;
        }

            ${NavMenu}{
                display: none;
            }

            &:hover{
                ${NavMenu}{
                    width: 130px;
                    height: 130px;
                    font-size: 14px;
                    padding: 10px 5px;
                    text-align: left;
                    background: #eee;
                    border-radius: 4px;
                    display: flex;
                    flex-flow: column;
                    align-items: flex-start;
                    gap: 15px;
                    position: absolute;
                    right: 0;
                    top: -18px;
                    z-index: 999;

                    li>a{
                        width: 130px;
                        span{
                            color: #595959;
                            font-weight: 200;
                            width: 100%;
                        }
                    }
                }
            }
        }
`;

const SignOut = styled.div`
    width: 100px;
    font-size: 14px;
    letter-spacing: 3px;
    padding: 10px;
    background: rgba(19, 19, 19, 0.5);
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0.34);
    box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
    opacity: 0;
    position: absolute;
    top: 48px;
    right: 0px;
    cursor: pointer;
`;

const Profile = styled.div`
    width: 48px;
    height: 48px;
    position: relative;
    
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    &:hover{
        ${SignOut}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;


export default Header
