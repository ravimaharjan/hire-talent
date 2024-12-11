import React from 'react'

function BasicInfo({ profile }) {

    const { freelancerInfo } = profile;
    return (
        <div class='profile'>

            <div className='img-profile'>
            </div>
            <div className='con prof-basic-info'>
                <div className='name'>
                    {profile.name}
                </div>
                <div className='title'>
                    {freelancerInfo?.title ?? ""}
                </div>
                <div style={{ fontSize: 12, paddingTop: 10 }}>
                    {profile.country}
                </div>
            </div>

            <div className="con con-about">
                <h3 >About</h3>
                <div className="prof-about">
                    {freelancerInfo.about}
                </div>
            </div>


        </div>
    )
}

export default BasicInfo