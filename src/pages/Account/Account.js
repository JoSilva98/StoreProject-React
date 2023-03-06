import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginContext } from "../../context/loginContext"
import "./style.css"
import ProfileForm from "../../components/ProfileForm/ProfileForm"
import useUserInfo from "../../hooks/useUserInfo"

export default function Account() {
    const { logout } = useContext(loginContext)
    const { decryptedId, decryptedToken, isAdmin } = useUserInfo()
    const [showEdit, setShowEdit] = useState(false)
    const navigate = useNavigate()

    function handleUserClick() {
        setShowEdit(prev => !prev)
    }

    function handleLogout() {
        logout()
        navigate("/")
    }

    return (
        <div className="account">
            <Header />
            <main className="account_main">
                {!isAdmin &&
                    (showEdit ? <ProfileForm decryptedId={decryptedId} decryptedToken={decryptedToken} /> :
                        <button className="account_button" onClick={handleUserClick}>Edit profile</button>
                    )
                }

                {isAdmin && <div className="account_admin_buttons">
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
    )
}