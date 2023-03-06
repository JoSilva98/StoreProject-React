import "./style.css"

export default function PasswordValidation({ checkValidation, passValidation }) {
    return (
        <div className="password_validation">
            <h3 className="password_validation_title">Password must contain:</h3>
            <div className="password_validation_params">
                <p className={checkValidation(passValidation.lower)}>A <b>lowercase</b> letter</p>
                <p className={checkValidation(passValidation.upper)}>A <b>capital</b> letter</p>
                <p className={checkValidation(passValidation.number)}>A <b>number</b></p>
                <p className={checkValidation(passValidation.length)}><b>8 - 40 characters</b></p>
            </div>
        </div>
    )
}