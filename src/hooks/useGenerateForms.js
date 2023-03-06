import starIcon from "../assets/yellow-star.png"
import arrowDown from "../assets/arrow-down.png"
import arrowRight from "../assets/arrow-right.png"
import Radio from "../components/SideBar/components/Radio/Radio"

export default function useGenerateForms(showForms, handleClick) {
    function generateRange(content, minVal, maxVal, mainVal, handleChange) {
        const isRate = content.split(" ")[1] === "Rate"

        function chooseClass() {
            return `range_single_value_${isRate ? "star" : "euros"}`
        }

        let minValContent
        let maxValContent
        let mainValContent

        if (isRate) {
            minValContent = <img className="side_bar_star" src={starIcon} />
            maxValContent = (
                <div>
                    {[...Array(5)].map((_, i) => <img key={`max_${i}`} className="side_bar_star" src={starIcon} />)}
                </div>
            )
            mainValContent = (
                <div className="range_stars_value">
                    {[...Array(mainVal)].map((_, i) => <img key={`main_${i}`} className="side_bar_star" src={starIcon} />)}
                </div>
            )
        }
        else {
            minValContent = `${minVal * 100}€`
            maxValContent = `${maxVal * 100}€`
            mainValContent = `${mainVal * 100}€`
        }

        return (
            <div className="range_main_div">
                <p className="range_title">{content}</p>
                <div className="range_div">
                    <span className={chooseClass()}>{minValContent}</span>
                    <input
                        className="range"
                        type="range"
                        min={minVal}
                        max={maxVal}
                        value={mainVal}
                        onChange={e => handleChange(Number(e.target.value))}
                    />
                    <span className={chooseClass()}>{maxValContent}</span>
                </div>
                <span className="range_value">Your value: {mainValContent}</span>
            </div>
        )
    }

    function generateButton(content, prop, position) {
        return <div
            className={`side_bar_button_${position}`}
            onClick={() => handleClick(prop, position)}
        >
            <h2>{content}</h2>
            <img src={showForms[position][prop] ? arrowDown : arrowRight} />
        </div>
    }

    function generateRadio(content, id, name, changeLinkProps) {
        return <Radio content={content} id={id} name={name} changeLinkProps={changeLinkProps} />
    }

    return { generateRange, generateButton, generateRadio }
}