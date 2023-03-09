import { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import userLogo from "../../../assets/user-logo.png"
import Footer from "../../../components/Footer/Footer"
import Header from "../../../components/Header/Header"
import useUserInfo from "../../../hooks/useUserInfo"
import getUser from "../../../services/getUser"
import "./style.css"

export default function Profile() {
    const location = useLocation()
    const { decryptedId, decryptedToken, isAdmin } = useUserInfo()
    const [isUser, setIsUser] = useState(false)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        let creds
        let checkRole

        if (location.state) {
            creds = { id: location.state.userId, token: decryptedToken }
            checkRole = location.state.adminRole
            setIsUser(false)
        } else {
            creds = { id: decryptedId, token: decryptedToken }
            checkRole = isAdmin
            setIsUser(true)
        }

        getUser(creds, checkRole)
            .then(res => res.json())
            .then(json => {
                setUser(json)
                setLoading(false)
            })
    }, [])

    return decryptedId ? 
    <div className="profile">
        <Header />
        {loading ? <main />
            :
            <main>
                <div>
                    <h2>
                        {user.firstName + " " + user.lastName}
                        {user.lastName?.slice(-1).toUpperCase() === "S" ? "'" : "'s"} Profile
                    </h2>
                    <img src={userLogo} alt="Profile" />
                    <p>{user.dateOfBirth}</p>
                    <p>{user.address}</p>
                    <p>{user.email}</p>
                    {isUser ? 
                        <button onClick={() => navigate("/account")}>Back to profile</button>
                        :
                        <button onClick={() => navigate("/account/userlist")}>Back to user list</button>
                    }
                </div>
            </main>
        }

        <Footer />
    </div>
    : <Navigate to="/" />
}