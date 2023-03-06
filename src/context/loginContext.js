import { AES } from "crypto-js";
import { createContext, useEffect, useState } from "react";
import { idKey, roleKey, tokenKey } from "../secretKeys";

const loginContext = createContext()

function LoginContextProvider(props) {
    const [login, setLogin] = useState({
        id: JSON.parse(localStorage.getItem("id")) || "",
        role: JSON.parse(localStorage.getItem("role")) || "",
        token: JSON.parse(localStorage.getItem("token")) || "",
    })

    useEffect(() => {
        localStorage.setItem("id", JSON.stringify(login.id))
        localStorage.setItem("role", JSON.stringify(login.role))
        localStorage.setItem("token", JSON.stringify(login.token))
    }, [login])

    function updateLogin(id, role, token) {
        const encryptedId = AES.encrypt(id, idKey).toString()
        const encryptedRole = AES.encrypt(role, roleKey).toString()
        const encryptedToken = AES.encrypt(token, tokenKey).toString()
        setLogin(() => ({ id: encryptedId, role: encryptedRole, token: encryptedToken }))
    }

    function logout() {
        setLogin({ id: "", role: "", token: ""})
    }

    return (
        <loginContext.Provider value={{ login, updateLogin, logout }}>
            {props.children}
        </loginContext.Provider>
    )
}

export { LoginContextProvider, loginContext }