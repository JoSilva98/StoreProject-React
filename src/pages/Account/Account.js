import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { loginContext } from "../../context/loginContext"
import "./style.css"
import useUserInfo from "../../hooks/useUserInfo"

export default function Account() {
    const { logout } = useContext(loginContext)
    const { decryptedId, isAdmin } = useUserInfo()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/")
    }

    return (
        decryptedId ?
            <div className="account">
                <Header />
                <main className="account_main">
                    {!isAdmin &&
                        <div className="account_buttons">
                            <button className="account_button" onClick={() => navigate("/account/profile")}>View profile</button>
                            <button className="account_button" onClick={() => navigate("/account/updateprofile")}>Edit profile</button>
                        </div>
                    }

                    {isAdmin && <div className="account_buttons">
                        <button
                            onClick={() => navigate("/account/userlist")}
                            className="account_admin_button"
                        >Users List</button>
                        <button
                            onClick={() => navigate("/account/adduser")}
                            className="account_admin_button"
                        >Add User</button>
                    </div>
                    }

                    <button id="logout_button" className="account_button" onClick={handleLogout}>Logout</button>
                </main>
                <Footer />

            </div>
            :
            <Navigate to="/" />
    )
}