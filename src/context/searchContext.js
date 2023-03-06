import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const searchContext = createContext()

function SearchContextProvider(props) {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useState({ value: "", search: false, isSearchBar: false })
    const location = useLocation()

    useEffect(() => {
        setSearchParams(prev => ({ ...prev, value: "" }))
    }, [location.pathname])

    function updateSearchParams(value) {
        setSearchParams(prev => ({ ...prev, value }))
    }

    function searchProducts(event) {
        if (event.keyCode !== 13) return
        navigate("/products")
        setSearchParams(prev => ({ ...prev, search: !prev.search, isSearchBar: true }))
    }

    function turnOffSearchBar() {
        setSearchParams(prev => ({ ...prev, value: "", isSearchBar: false }))
    }

    return <searchContext.Provider value={{ searchParams, updateSearchParams, searchProducts, turnOffSearchBar }}>
        {props.children}
    </searchContext.Provider>
}

export { SearchContextProvider, searchContext }