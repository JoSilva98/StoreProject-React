import { AES } from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import { useContext } from "react";
import { loginContext } from "../context/loginContext"
import { idKey, roleKey, tokenKey } from "../secretKeys";

export default function useUserInfo() {
    const { login } = useContext(loginContext)
    const decryptedId = AES.decrypt(login.id, idKey).toString(Utf8)
    const decryptedToken = AES.decrypt(login.token, tokenKey).toString(Utf8)
    const isAdmin = AES.decrypt(login.role, roleKey).toString(Utf8) === "ADMIN"

    return { decryptedId, decryptedToken, isAdmin }
}