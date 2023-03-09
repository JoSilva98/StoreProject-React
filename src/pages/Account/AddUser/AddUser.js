import "./style.css"
import Register from "../../Register/Register"
import { Navigate } from "react-router-dom"
import useUserInfo from "../../../hooks/useUserInfo"

export default function AddUser() {
    const { isAdmin } = useUserInfo()
    return isAdmin ? <Register isAddUser={true} /> : <Navigate to="/" />
}