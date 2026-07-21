import React, { useState } from 'react'
import './Profile.css'

function Profile({user, setUser}) {

    const [show, setShow] = useState(false)

    function logout()
    {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <div 
            className='profile'
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >

            <div className='profileicon'>
                👤︎
            </div>

            {
                show &&
                <div className='profilecard'>
                    <h3>{user.username}</h3>
                    <h3>{user.mobile}</h3>

                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            }

        </div>
    )
}

export default Profile