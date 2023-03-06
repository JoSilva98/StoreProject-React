import jeweleryImg from "../../assets/jewelery.jpg"
import clothesImg from "../../assets/clothes.jpg"
import "./style.css"
import { useNavigate } from "react-router-dom"

export default function Hero() {
    const navigate = useNavigate()

    function productsNavigation() {
        navigate("/products", { state: { prods: "prods" } })
    }

    function jeweleryNavigation() {
        navigate("/products", { state: { category: "jewelery" } })
    }

    return (
        <main>
            <h1 className="intro_text">Welcome to the store!</h1>

            <div className="clothes" onClick={productsNavigation}>
                <div className="clothes_img_div">
                    <h2 className="clothes_word">Clothes</h2>
                    <img src={clothesImg} alt="Clothes" className="clothes_img" />
                </div>
                <h2 className="clothes_text">Check out the products</h2>
            </div>

            <div className="jewelery" onClick={jeweleryNavigation}>
                <h2 className="jewelery_text">Trending Now</h2>
                <div className="jewelery_img_div">
                    <h2 className="jewelery_word">Jewelery</h2>
                    <img src={jeweleryImg} alt="Jewelery" className="jewelery_img" />
                </div>
            </div>
        </main >
    )
}