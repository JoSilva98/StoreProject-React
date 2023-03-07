import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useUserInfo from "../../hooks/useUserInfo"
import updateUser from "../../services/updateUser"
import PasswordValidation from "../RegisterForm/PasswordValidation/PasswordValidation"
import "./style.css"

export default function ProfileForm() {
    const navigate = useNavigate()
    const { decryptedId, decryptedToken } = useUserInfo()
    const formDataDefault = { value: "", errorMessage: "" }
    const [status, setStatus] = useState({ isUpdated: false, isEmpty: false })
    const [passValidation, setPassValidation] = useState({})
    const [formData, setFormData] = useState({
        firstName: formDataDefault,
        lastName: formDataDefault,
        email: formDataDefault,
        password: formDataDefault,
        address: formDataDefault
    })

    useEffect(() => {
        const { password } = formData
        setPassValidation({
            lower: password.value.match(/[a-z]/),
            upper: password.value.match(/[A-Z]/),
            number: password.value.match(/[0-9]/),
            length: password.value.length >= 8 && password.value.length <= 40
        })
    }, [formData.password.value])

    function checkValidation(param) {
        return (param ? "valid" : "invalid") + "_password"
    }

    function addFormDataValues(event) {
        setStatus({ isUpdated: false, isEmpty: false })
        const { name, value } = event.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    value
                }
            }
        })
    }

    async function update(event) {
        event.preventDefault()

        setStatus(({ isUpdated: false, isEmpty: false }))

        const { lower, upper, number, length } = passValidation
        let foundSome = false

        if (!lower || !upper || !number || !length) {
            if (formData.password.length > 0) {
                setFormData(prev => ({ ...prev, password: { ...prev.password, errorMessage: "Password doesn't fit the parameters bellow" } }))
                return
            }
        }

        for (const prop in formData)
            if (formData[prop].value.trim()) foundSome = true

        if (!foundSome) {
            setStatus(prev => ({ ...prev, isEmpty: true }))
            return
        }

        const res = await updateUser(decryptedId, decryptedToken, formData)
        if (res.status === 200) {
            setStatus(prev => ({ ...prev, isUpdated: true }))
            setFormData({
                firstName: formDataDefault,
                lastName: formDataDefault,
                email: formDataDefault,
                password: formDataDefault,
                address: formDataDefault
            })
        } else {
            const decoded = new TextDecoder().decode((await res.body.getReader().read()).value)
            const json = JSON.parse(decoded)
            for (const prop in json)
                setFormData(prev => ({
                    ...prev,
                    [prop]: {
                        ...prev[prop],
                        errorMessage: json[prop][0].toUpperCase() + json[prop].slice(1)
                    }
                }))
        }
    }

    return (
        <main className="register_main">
            <div className="register_main_div">
                <h1 className="register_title">Update Data</h1>
                <form className="register_form">
                    <input
                        className={formData.firstName.errorMessage ? "register_empty_input" : "register_input"}
                        type="text"
                        placeholder="First Name"
                        required
                        name="firstName"
                        value={formData.firstName.value}
                        onChange={addFormDataValues}
                        maxLength={50}
                    />
                    {formData.firstName.errorMessage && <p className="error_message">{formData.firstName.errorMessage}</p>}

                    <input
                        className={formData.lastName.errorMessage ? "register_empty_input" : "register_input"}
                        type="text"
                        placeholder="Last Name"
                        required
                        name="lastName"
                        value={formData.lastName.value}
                        onChange={addFormDataValues}
                        maxLength={50}
                    />
                    {formData.lastName.errorMessage && <p className="error_message">{formData.lastName.errorMessage}</p>}

                    <input
                        className={formData.email.errorMessage ? "register_empty_input" : "register_input"}
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={formData.email.value}
                        onChange={addFormDataValues}
                        maxLength={40}
                    />
                    {formData.email.errorMessage && <p className="error_message">{formData.email.errorMessage}</p>}

                    <input
                        className={formData.password.errorMessage ? "register_empty_input" : "register_input"}
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={formData.password.value}
                        onChange={addFormDataValues}
                        maxLength={40}
                    />
                    {formData.password.errorMessage && <p className="error_message">{formData.password.errorMessage}</p>}

                    <input
                        className={formData.address.errorMessage ? "register_empty_input" : "register_input"}
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={formData.address.value}
                        onChange={addFormDataValues}
                        maxLength={80}
                    />
                    {formData.address.errorMessage && <p className="error_message">{formData.address.errorMessage}</p>}

                    <PasswordValidation checkValidation={checkValidation} passValidation={passValidation} />
                    <button className="register_button" onClick={update}>Update Data</button>
                    <button className="update_button_cancel" onClick={() => navigate("/account")}>Cancel</button>

                    <div className="update_product_message">
                        {status.isUpdated && <p className="update_product_message_success">User data updated!</p>}
                        {status.isEmpty && <p className="update_product_message_empty">No fields updated</p>}
                    </div>
                </form>
            </div>
        </main>
    )
}