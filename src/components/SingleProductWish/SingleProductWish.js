import { useNavigate } from "react-router-dom"
import fullHeart from "../../assets/heart-full.png"
import starIcon from "../../assets/star-full.png"
import "./style.css"

export default function SingleProductWish({ product, removeProduct }) {
    const navigate = useNavigate()

    function nav() {
        navigate(`/product/${product.id}`)
    }

    function getRate() {
        const rate = product.rating.rate
        if (rate % 1 === 0) return rate.toFixed(0)
        return rate.toFixed(1)
    }

    return <div className="single_product_wish">
        <div className="single_product_wish_imgage_div">
            <img
                className="single_product_wish_image"
                src={product.image}
                alt="Product Image"
                onClick={() => navigate(`/product/${product.id}`)}
            />
        </div>
        <div>
            <div className="single_product_wish_info">
                <p className="single_product_wish_title" onClick={nav}>{product.title}</p>
                <div className="single_product_wish_rate" onClick={nav}>
                    <p className="single_product_wish_rate_number" onClick={nav}>{getRate()}</p>
                    <img src={starIcon} alt="Star Icon" onClick={nav} />
                </div>
                <p className="single_product_wish_price" onClick={nav}>{product.price}€</p>
                <img
                    className="single_product_wish_heart"
                    src={fullHeart}
                    alt="Heart"
                    onClick={() => removeProduct(product.id)}
                />
            </div>
        </div>
    </div>
}