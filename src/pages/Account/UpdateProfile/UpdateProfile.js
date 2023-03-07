import { Navigate } from "react-router-dom"
import Footer from "../../../components/Footer/Footer"
import Header from "../../../components/Header/Header"
import ProfileForm from "../../../components/ProfileForm/ProfileForm"
import useUserInfo from "../../../hooks/useUserInfo"
import "./style.css"

export default function UpdateProfile() {
    const { decryptedId } = useUserInfo()
    return decryptedId ?
    <div>
        <Header />
        <ProfileForm />
        <Footer />
    </div>
    : <Navigate to="/" />
}