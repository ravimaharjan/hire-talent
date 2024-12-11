
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Login/loginSlice';
import { Container, Row, Col } from 'reactstrap';
import { profileData } from './profileSlice';
import Profile from './profile';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Home() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profileData);


    useEffect(() => {
        async function getProfileData() {
            await dispatch(profileData());

        }
        getProfileData();

    }, [])

    if (!profile) return;

    const { freelancerInfo } = profile.data;




    return (
        <Container className='main-container'>
            <div >
                <ToastContainer autoClose={2000} />
                {freelancerInfo ?
                    <Profile profile={profile.data} /> :
                    <div>test</div>
                }

            </div>
        </Container >

    )
}

export default Home