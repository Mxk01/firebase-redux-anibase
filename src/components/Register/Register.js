import { useState } from 'react'
import './Register.css';
import { ToastContainer, toast } from 'react-toast'

import { Link, useHistory } from 'react-router-dom'
// import { useToasts, ToastProvider } from 'react-toast-notifications'


// required imports for register
import { getDB } from '../../utils/firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


function Register() {
    // const { addToast } = useToasts()

    let history = useHistory()
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');




    let registerUser = (e) => {
        e.preventDefault()
        let auth = getAuth();
        console.log(username, email, password)
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
                // add aditional info to profile
                console.log(userCredentials.user)


                updateProfile(userCredentials.user, { displayName: username })
                    .then(() => history.push('/login'))
                    .catch(e =>
                        // addToast(e.message, {
                        //     appearance: 'success',
                        //     autoDismiss: true,
                        // })
                        console.log(e)
                        // toast.error(e.errorMessage)
                    )
            })
        }
        else {
            history.push('/register')
        }
    }
    return (
        <div className="login__container">
            <form className="register__form" onSubmit={(e) => registerUser(e)}>

                <label htmlFor="register__username">
                    <span className="r__username">Username </span>
                    <input type="text"
                        onChange={e => setUsername(e.target.value)} id="register__username" spellCheck="false" />
                </label>
                <label htmlFor="register__email">
                    <span className="r__email">Email </span>
                    <input type="text"
                        onChange={e => setEmail(e.target.value)}
                        id="register__email" spellCheck="false" />
                </label>

                <label htmlFor="register__password">
                    <span className="r__password">Password </span>
                    <input type="password"
                        onChange={e => setPassword(e.target.value)}
                        spellCheck="false" />
                </label>

                <label htmlFor="register__confirm__password">
                    <span className="r__password">Confirm password </span>
                    <input type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        spellCheck="false" />
                </label>
                <button>Submit</button>
                <Link to="/login" style={{ textDecoration: 'none', color: "rgb(40, 255, 58)" }}>Already have an account?</Link>

            </form>
        </div>
    )
}

export default Register
