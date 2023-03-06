import "./style.css"
import { Link } from "react-router-dom";
import PasswordValidation from "./PasswordValidation/PasswordValidation";
import { useRef } from "react";

export default function RegisterForm(props) {
    const ref = useRef()
    const {
        formData,
        addFormDataValues,
        checkValidation,
        passValidation,
        register,
        emailExists,
        isAddUser,
        addedUser
    } = props
    function error(prop) {
        return formData[prop].isWrong && <p className="error_message">{formData[prop].errorMessage}</p>
    }

    return (
        <main className="register_main">
            <div className="register_main_div">
                <h1 className="register_title">{isAddUser ? "Add User" : "Register"}</h1>
                <form className="register_form">
                    <input
                        className={formData.firstName.isFilled ? "register_input" : "register_empty_input"}
                        type="text"
                        placeholder="First Name"
                        required
                        name="firstName"
                        value={formData.firstName.value}
                        onChange={addFormDataValues}
                        maxLength={30}
                    />
                    {error("firstName")}

                    <input
                        className={formData.lastName.isFilled ? "register_input" : "register_empty_input"}
                        type="text"
                        placeholder="Last Name"
                        required
                        name="lastName"
                        value={formData.lastName.value}
                        onChange={addFormDataValues}
                        maxLength={30}
                    />
                    {error("lastName")}

                    <input
                        className={formData.email.isFilled ? "register_input" : "register_empty_input"}
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={formData.email.value}
                        onChange={addFormDataValues}
                        maxLength={30}
                    />
                    {error("email")}
                    {emailExists && <p className="error_message">Email already exists</p>}

                    <input
                        className={formData.password.isFilled ? "register_input" : "register_empty_input"}
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={formData.password.value}
                        onChange={addFormDataValues}
                        maxLength={40}
                    />
                    {error("password")}

                    <input
                        className={formData.dateOfBirth.isFilled ? "register_input" : "register_empty_input"}
                        ref={ref}
                        onFocus={() => ref.current.type = "date"}
                        onBlur={() => ref.current.type = "text"}
                        type="text"
                        placeholder="Date of Birth"
                        required
                        name="dateOfBirth"
                        value={formData.dateOfBirth.value}
                        onChange={addFormDataValues}
                    />
                    {error("dateOfBirth")}

                    <input
                        className={formData.address.isFilled ? "register_input" : "register_empty_input"}
                        type="text"
                        placeholder="Address"
                        required
                        name="address"
                        value={formData.address.value}
                        onChange={addFormDataValues}
                        maxLength={40}
                    />
                    {error("address")}

                    <PasswordValidation checkValidation={checkValidation} passValidation={passValidation} />
                    <button className="register_button" onClick={register}>{isAddUser ? "Add User" : "Register"}</button>

                    <div className="update_product_message">
                        {addedUser.isAdded && <p className="update_product_message_success">User added!</p>}
                        {addedUser.error && <p className="update_product_message_error">An error occurred</p>}
                    </div>
                </form>
                {!isAddUser && <p className="login_text">Already have an account? <Link className="login_link" to="/login">Login</Link></p>}
            </div>
        </main>
    )
}