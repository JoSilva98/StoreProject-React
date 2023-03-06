import { useState } from "react"
import { RadioContextProvider } from "../../context/radioContext"
import SideBarForm from "./components/SideBarForm/SideBarForm"

const minPrice = { min: 0, max: 10 }
const maxPrice = { min: 2, max: 50 }

export default function SideBar({ changeLinkProps }) {
    const [minValMain, setMinValMain] = useState(minPrice.max / 2)
    const [maxValMain, setMaxValMain] = useState((maxPrice.max - maxPrice.min) / 2)
    const [minStarMain, setMinStarMain] = useState(3)
    const [maxStarMain, setMaxStarMain] = useState(3)

    const [showForms, setShowForms] = useState({
        main: {
            showOrderForm: false,
            showFilterForm: false
        },
        secondary: {
            showCategoryForm: false,
            showRatingForm: false,
            showPriceForm: false
        }
    })

    function handleFormSelection(prop, position) {
        setShowForms(prev => {
            const oldValue = prev[position][prop]
            const newObj = {}

            if (position === "main")
                return {
                    ...prev,
                    [position]: {
                        ...prev[position],
                        [prop]: !oldValue
                    }
                }

            for (const property in prev[position])
                if (prop !== property) newObj[property] = false
                else newObj[property] = !oldValue

            return { ...prev, secondary: newObj }
        })
    }

    function handleClick(prop, position) {
        handleFormSelection(prop, position)
    }

    const variables = { showForms, minPrice, maxPrice, minValMain, maxValMain, minStarMain, maxStarMain }
    const functions = { setMinValMain, setMaxValMain, setMinStarMain, setMaxStarMain, handleClick, changeLinkProps }

    return <RadioContextProvider>
        <SideBarForm
            variables={variables}
            functions={functions}
        />
    </RadioContextProvider>
}