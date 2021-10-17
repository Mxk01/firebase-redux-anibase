import React, { useState } from 'react'
import './User.css';
import { getAuth, updateProfile } from 'firebase/auth'
import Navbar from '../Navbar/Navbar'
function User() {
    let user = getAuth().currentUser
    console.log(user);
    console.log(user.metadata)
    let [photo, setPhoto] = useState(user.photoURL);
    let [username, setUsername] = useState(user.displayName)

    let updateUser = (e) => {
        e.preventDefault();
        updateProfile(user, { photoURL: photo, displayName: username })
            .then(function () { console.log(user) })
            .catch(function (error) { console.log(error) });
    }



    return (
        <>
            <Navbar />
            <div className="user__container">

                {/* Update username / Update  image  / password  */}
                {/* get user reference  then update fields */}
                <form onSubmit={(e) => updateUser(e)} className="user__form">
                    <input type="text" style={{ marginTop: "16rem" }} />
                    <label htmlFor="">Username</label>
                    <input type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="">Avatar URL </label>
                    <input type="text" value={photo} required
                        onChange={(e) => setPhoto(e.target.value)} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    )
}

export default User
