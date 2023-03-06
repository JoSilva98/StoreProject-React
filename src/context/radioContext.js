import { createContext, useState } from "react";

const radioContext = createContext()

function RadioContextProvider(props) {
    const [radioChecker, setRadioChecker] = useState({
        direction: {
            ASC: true,
            DESC: false
        },
        category: {
            "women's_clothing": false,
            "men's_clothing": false,
            "jewelery": false
        }
    })

    function checkRadio(form, prop) {
        setRadioChecker(prev => {
            const newChecker = prev[form]

            for (const p in newChecker)
                if (p === prop) newChecker[p] = true
                else newChecker[p] = false

            return { ...prev, [form]: newChecker }
        })
    }

    function refreshRadio() {
        setRadioChecker(prev => {
            const newChecker = { ...prev }
            for (const formProp in prev)
                for (const valProp in prev[formProp])
                    if (valProp === "ASC") newChecker[formProp][valProp] = true
                    else newChecker[formProp][valProp] = false

            return newChecker
        })
    }

    function refreshCategoryRadio() {
        setRadioChecker(prev => {
            const newRadio = {}
            for (const prop in prev.category)
                newRadio[prop] = false

            return { ...prev, category: newRadio }
        })
    }

    return <radioContext.Provider value={{ radioChecker, checkRadio, refreshRadio, refreshCategoryRadio }}>
        {props.children}
    </radioContext.Provider>
}

export { RadioContextProvider, radioContext }