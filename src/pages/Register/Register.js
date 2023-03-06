import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useContext, useEffect, useState } from "react"
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import submitRegistration from "../../services/submitRegistration"
import { useNavigate } from "react-router-dom"
import { loginContext } from "../../context/loginContext"
import validateLogin from "../../services/validateLogin"
import decodeMessage from "../../services/decodeMessage"

export default function Register({ isAddUser }) {
    const navigate = useNavigate()
    const { updateLogin } = useContext(loginContext)
    const [addedUser, setAddedUser] = useState({ isAdded: false, error: false })

    const formDataDefault = { value: "", isFilled: true, isWrong: false, errorMessage: "" }
    const [passValidation, setPassValidation] = useState({})
    const [emailExists, setEmailExists] = useState(false)
    const [formData, setFormData] = useState({
        firstName: formDataDefault,
        lastName: formDataDefault,
        email: formDataDefault,
        password: formDataDefault,
        dateOfBirth: formDataDefault,
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

    function addFormDataValues(event) {
        const { value, name } = event.target
        setFormData(prev => ({ ...prev, [name]: { ...prev[name], value } }))
    }

    function checkValidation(param) {
        return (param ? "valid" : "invalid") + "_password"
    }

    function updateFormData(prop, isFilled, isWrong, errorMessage) {
        setFormData(prev => ({
            ...prev,
            [prop]: {
                ...prev[prop],
                isFilled,
                isWrong: isWrong || false,
                errorMessage: errorMessage || ""
            }
        }))

        setAddedUser({ isAdded: false, error: false })
    }

    async function register(event) {
        event.preventDefault()
        setEmailExists(false)
        let isFormValid = true
        const { lower, upper, number, length } = passValidation

        for (const prop in formData)
            if (!formData[prop].value) {
                updateFormData(prop, false)
                isFormValid = false
            }
            else updateFormData(prop, true)

        if (!lower || !upper || !number || !length) {
            updateFormData("password", false)
            isFormValid = false
        }

        if (isFormValid) {
            const fetchRegistration = await submitRegistration(formData)

            if (fetchRegistration.status === 200) {
                const credentials = { email: formData.email.value, password: formData.password.value }
                const res = await validateLogin(credentials)

                if (res.status === 200) {
                    if (isAddUser) {
                        setAddedUser({ isAdded: true, error: false })
                        setFormData(prev => {
                            const newForm = {}
                            for (const prop in prev) newForm[prop] = formDataDefault
                            return newForm
                        })
                    }
                    else {
                        updateLogin(res.headers.get('ID'), res.headers.get('ROLE'), res.headers.get('Authorization'))
                        navigate("/")
                    }
                }
            } else if (fetchRegistration.status === 400) {
                const { propArray, jsonMessage } = await decodeMessage(fetchRegistration)

                for (const prop of propArray) {
                    const errorMessage = jsonMessage[prop]
                    const fixedMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1)
                    updateFormData(prop, false, true, fixedMessage)
                }
            } else if (fetchRegistration.status === 409) {
                updateFormData("email", false)
                setEmailExists(true)
            } else if (fetchRegistration.status === 500) {
                if (isAddUser) 
                console.log(fetchRegistration)
                navigate("/")
            }

        }
    }

    return (
        <div className="register">
            <Header />
            <RegisterForm
                formData={formData}
                addFormDataValues={addFormDataValues}
                checkValidation={checkValidation}
                passValidation={passValidation}
                register={register}
                emailExists={emailExists}
                isAddUser={isAddUser}
                addedUser={addedUser}
            />
            <Footer />
        </div>
    )
}