import "./style.css"
import storeLogo from "../../assets/store-logo.png"
import searchIcon from "../../assets/search.png"
import loginIcon from "../../assets/user.png"
import heartIcon from "../../assets/heart.png"
import cartIcon from "../../assets/shopping-cart.png"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { loginContext } from "../../context/loginContext"
import { searchContext } from "../../context/searchContext"
import getProductsTitles from "../../services/getProductsTitles"

export default function Header() {
    const { login } = useContext(loginContext)
    const [productsTitles, setProductsTitles] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const { searchParams, updateSearchParams, searchProducts } = useContext(searchContext)
    const searchBarRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        getProductsTitles().then(json => setProductsTitles(json))
        document.addEventListener("click", closeOpenDropdown)
        return () => document.removeEventListener("click", closeOpenDropdown)
    }, [showDropdown])

    function navigateLogin() {
        login.id && login.role ? navigate("/account") : navigate("/login")
    }

    function handleSearch(event) {
        const val = event.target.value
        setShowDropdown(() => val.length !== 0)
        updateSearchParams(val)
    }

    function handleDropdown({ id, title }) {
        updateSearchParams(title)
        navigate(`/product/${id}`)
    }

    function closeOpenDropdown(e) {
        if (searchBarRef.current && showDropdown && !searchBarRef.current.contains(e.target))
            setShowDropdown(false)
        else if (searchBarRef.current && searchParams.value && searchBarRef.current.contains(e.target))
            setShowDropdown(true)
    }

    function displayDropdown() {
        const prods = productsTitles.filter(prod => {
            const searchTerm = searchParams.value.toUpperCase()
            const fullName = prod.title.toUpperCase()
            const description = prod.description.toUpperCase()
            const category = prod.category.toUpperCase()

            return fullName.includes(searchTerm) || description.includes(searchTerm)
                || category.includes(searchTerm) || prod.price.toString().includes(searchTerm)
        })

        return prods.map((prod, i) =>
            <div key={prod.title} className={`dropdown_row${i === prods.length - 1 ? "_last" : ""}`}
                onClick={() => handleDropdown(prod)}
            >
                <img src={searchIcon} alt="Search" />
                <p>{prod.title}</p>
            </div>
        )
    }

    return (
        <header className="header">
            <img className="store_name" src={storeLogo} alt="Store Logo" onClick={() => navigate("/")} />
            <nav className="navigation">
                <div className="search_container" ref={searchBarRef}>
                    <div className={`search_bar${showDropdown ? "_open" : ""}`}>
                        <input
                            className="input_bar"
                            type="text"
                            placeholder="Search"
                            value={searchParams.value}
                            onChange={handleSearch}
                            maxLength="100"
                            onKeyDown={searchProducts}
                        />
                        <img className="search_icon" src={searchIcon} alt="Search Icon" />
                    </div>
                    <div className="dropdown">
                        {showDropdown && displayDropdown()}
                    </div>
                </div>

                <div className="header_icons">
                    <img className="login_icon" src={loginIcon} alt="Login Icon" onClick={navigateLogin} />
                    <img className="heart_icon" src={heartIcon} alt="Heart Icon" onClick={() => navigate("/wishlist")} />
                    <img className="cart_icon" src={cartIcon} alt="Cart Icon" onClick={() => navigate("/cart")} />
                </div>
            </nav>
        </header>
    )
}