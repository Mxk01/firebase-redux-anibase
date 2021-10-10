import { useState } from 'react'
import './Login.css';
import { Link, useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let history = useHistory();

    let login = (e) => {
        e.preventDefault()
        let auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(userCredential => {
            let token = userCredential._tokenResponse.idToken;
            localStorage.setItem('token', token)

            console.log(token);
            history.push('/')
        }).catch(e => e)


    }
    return (
        <div className="login__container">
            <form className="login__form" onSubmit={(e) => login(e)}>
                <label htmlFor="login__email">
                    <span className="l__email">Email </span>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} id="login__email" spellcheck="false" />
                </label>

                <label htmlFor="login__password">
                    <span className="l__password">Password </span>
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        spellcheck="false" />
                </label>

                <button>Submit</button>
                <Link to="/register" style={{ textDecoration: 'none', color: "rgb(40, 255, 58)" }}>Don't have an account?</Link>

            </form>
        </div>
    )
}

export default Login
