import React from 'react'
import BasicInfo from './basicInfo'
import Experience from '../Experience/experience'

function Profile({ profile }) {
    return (
        <>
            <BasicInfo profile={profile} />
            <Experience profile={profile} />
        </>
    )
}

export default Profile