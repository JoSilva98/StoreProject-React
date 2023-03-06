import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import validateLogin from "../../services/validateLogin"
import { loginContext } from "../../context/loginContext"

export default function Login({ isOverlay, loginRef }) {
    const navigate = useNavigate()
    const { updateLogin } = useContext(loginContext)

    const [loginFailed, setLoginFailed] = useState(false)
    const credentialsDefault = { value: "", isFilled: true }
    const [credentials, setCredentials] = useState({
        email: credentialsDefault,
        password: credentialsDefault
    })

    function updateCredentials(prop, isFilled) {
        setCredentials(prev => ({ ...prev, [prop]: { ...prev[prop], isFilled } }))
    }

    function handleChange(event) {
        setLoginFailed(false)
        const { value, name } = event.target
        setCredentials(prev => ({ ...prev, [name]: { ...prev[name], value } }))
    }

    async function handleLogin(event) {
        event.preventDefault()
        let isLoginValid = true

        for (const prop in credentials) {
            if (!credentials[prop].value) {
                updateCredentials(prop, false)
                isLoginValid = false
            } else updateCredentials(prop, true)
        }

        if (isLoginValid) {
            const creds = { email: credentials.email.value, password: credentials.password.value }
            const res = await validateLogin(creds)

            if (res.status !== 200) {
                setLoginFailed(true)
                return
            }

            setLoginFailed(false)
            updateLogin(res.headers.get('ID'), res.headers.get('ROLE'), res.headers.get('Authorization'))
            navigate("/")
        }
    }

    return (
        <div className={isOverlay ? "login_overlay" : "login"}>
            {!isOverlay && <Header />}
            <main className={isOverlay ? "login_main_overlay" : "login_main"}>
                <div className={isOverlay ? "login_main_div_overlay" : "login_main_div"} ref={loginRef}>
                    <h1 className="login_title">Login</h1>
                    <form className="login_form">
                        <input
                            className={credentials.email.isFilled ? "login_input" : "login_empty_input"}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={credentials.email.value}
                            onChange={handleChange}
                        />
                        <input
                            className={credentials.password.isFilled ? "login_input" : "login_empty_input"}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password.value}
                            onChange={handleChange}
                        />
                        <button className="login_button" onClick={handleLogin}>Login</button>
                    </form>
                    <p className="register_text">Don't have an account? <Link className="register_link" to="/register">Register here</Link></p>

                    {isOverlay &&
                        <div className="login_failed_div_overlay">
                            {loginFailed && <p className="login_failed">Incorrect email or password</p>}
                        </div>}
                </div>
            </main>
            <div className="login_failed_div">
                {loginFailed && <p className="login_failed">Incorrect email or password</p>}
            </div>
            {!isOverlay && <Footer />}
        </div>

    )
}