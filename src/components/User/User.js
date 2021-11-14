import React, { useState } from 'react'
import './User.css';
import { getAuth, updateProfile } from 'firebase/auth'
import Navbar from '../Navbar/Navbar'
import { collection, doc, query, where, deleteDoc, setDoc, getDocs } from '@firebase/firestore';
import { getDB } from '../../utils/firebase';
import { useHistory } from 'react-router-dom'
function User() {
    let user = getAuth().currentUser
    console.log(user);
    console.log(collection(getDB(), 'users'));
    let [photo, setPhoto] = useState(user.photoURL);
    let [username, setUsername] = useState(user.displayName)
    let history = useHistory('/')
    let updateUser = (e) => {
        e.preventDefault();
        updateProfile(user, { photoURL: photo, displayName: username })
            .then(function () {
                console.log(user)
                history.push('/')
            })
            .catch(function (error) { console.log(error) });
    }



    return (
        <>
            <Navbar />
            <div className="user__container">

                {/* Update username / Update  image  / password  */}
                {/* get user reference  then update fields */}
                <form onSubmit={(e) => updateUser(e)} className="user__form">

                    <label htmlFor="" style={{ marginTop: "16rem" }}>Username</label>
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
