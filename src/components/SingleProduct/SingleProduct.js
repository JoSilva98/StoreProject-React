import "./style.css"
import starIcon from "../../assets/star-full.png"
import fullHeart from "../../assets/heart-full.png"
import emptyHeart from "../../assets/heart-empty.png"
import deleteIcon from "../../assets/remove.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useUserInfo from "../../hooks/useUserInfo"
import deleteProductFetch from "../../services/deleteProductFetch"
import { AES } from "crypto-js"
import { wishListKey } from "../../secretKeys"
import Utf8 from "crypto-js/enc-utf8"

export default function SingleProduct({ product, setRefreshProducts }) {
    const [isHeartFull, setIsHeartFull] = useState(false)
    const navigate = useNavigate()
    const { decryptedToken, isAdmin } = useUserInfo()

    useEffect(() => {
        let wishList = localStorage.getItem("wishList")
        if (wishList) {
            wishList = JSON.parse(AES.decrypt(wishList, wishListKey).toString(Utf8))
            if (wishList[product.id]) setIsHeartFull(true)           
        }
    }, [])

    function getRate() {
        const rate = product.rating.rate
        if (rate % 1 === 0) return rate.toFixed(0)
        return rate.toFixed(1)
    }

    async function deleteProduct() {
        await deleteProductFetch(product.id, decryptedToken)
        setRefreshProducts(prev => !prev)
    }

    function addToWishList() {
        const newHeart = !isHeartFull
        setIsHeartFull(() => newHeart)

        let wishList = localStorage.getItem("wishList")
        if (wishList) wishList = JSON.parse(AES.decrypt(wishList, wishListKey).toString(Utf8))
        else wishList = {}

        if (newHeart) wishList[product.id] = product
        else delete wishList[product.id]

        const encryptedWishList = AES.encrypt(JSON.stringify(wishList), wishListKey).toString()
        localStorage.setItem("wishList", encryptedWishList)
    }

    return (
        <div className="single_product">
            {isAdmin && <img
                className="single_product_delete"
                src={deleteIcon}
                alt="Delete"
                onClick={deleteProduct}
            />}
            <img className="single_product_heart"
                src={isHeartFull ? fullHeart : emptyHeart}
                alt="Heart"
                onClick={addToWishList}
            />
            {product.stock === 0 && <p className="single_product_sold_out">Sold Out</p>}
            <div className="single_product_heartless" onClick={() => navigate(`/product/${product.id}`)}>
                <img className="single_product_image" src={product.image} alt="Product Image" />
                <div className="single_product_rate">
                    <p className="single_product_rate_number">{getRate()}</p>
                    <img src={starIcon} alt="Star Icon" />
                </div>
                <div className="single_product_info">
                    <p className="single_product_title">{product.title}</p>
                    <p className="single_product_price">{product.price}€</p>
                </div>
            </div>
        </div>
    )
}