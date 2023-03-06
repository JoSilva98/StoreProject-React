import "./style.css"
import { useContext, useState } from "react"
import { radioContext } from "../../../../context/radioContext"

export default function Radio({ content, id, name, changeLinkProps }) {
    const { radioChecker, checkRadio } = useContext(radioContext)
    const [isHover, setIsHover] = useState(false)

    return <div className={`side_bar_single_form_lines${isHover ? "_hover" : ""}`}
        onClick={() => checkRadio(name, id)}>
        <span
            className={`side_bar_fake_radio${radioChecker[name][id] ? "_checked" : ""}`}
            onMouseEnter={() => setIsHover(prev => !prev)}
            onMouseLeave={() => setIsHover(prev => !prev)}
            onClick={changeLinkProps}
        />
        <input
            className="side_bar_radio"
            onMouseEnter={() => setIsHover(prev => !prev)}
            onMouseLeave={() => setIsHover(prev => !prev)}
            type="radio"
            id={id}
            name={name}
            onClick={changeLinkProps}
        />
        <label
            onMouseEnter={() => setIsHover(prev => !prev)}
            onMouseLeave={() => setIsHover(prev => !prev)}
            className="side_bar_label"
            htmlFor={id}
        >
            {content}
        </label>
    </div>
}