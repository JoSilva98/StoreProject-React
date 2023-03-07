import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import getProducts from "../../services/getProducts"
import fullStar from "../../assets/star-full.png"
import emptyStar from "../../assets/star-empty.png"
import halfStar from "../../assets/star-half.png"
import ProductComponent from "../../components/Product/ProductComponent"
import ProductSkeleton from "../../components/ProductSkeleton/ProductSkeleton"
import useUserInfo from "../../hooks/useUserInfo"
import rateProductFetch from "../../services/rateProductFetch"
import { AES } from "crypto-js"
import { cartKey } from "../../secretKeys"
import Utf8 from "crypto-js/enc-utf8"
import ProductNotFound from "../../components/ProductNotFound/ProductNotFound"

export default function Product() {
    const { decryptedId, decryptedToken, isAdmin } = useUserInfo()
    const { id: productId } = useParams()
    const [notFound, setNotFound] = useState(false)
    const [fetchProduct, setFetchProduct] = useState(false)
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const intervalRef = useRef(null)
    const [userInicialRate, setUserInicialRate] = useState({ "0": false, "1": false, "2": false, "3": false, "4": false })
    const [isMouseOver, setIsMouseOver] = useState({ div: false, star: false })
    const [isAddedToCart, setIsAddedToCart] = useState(false)

    useEffect(() => {
        getProducts(`/${productId}`).then(({ json }) => {
            let cart = localStorage.getItem("cart")
            if (cart) {
                cart = JSON.parse(AES.decrypt(cart, cartKey).toString(Utf8))
                const isAny = cart.some(obj => obj.product.id == json.id)
                if (isAny) setIsAddedToCart(true)
            }

            if (JSON.stringify(json) !== '[]') {
                setProduct(json)
                setNotFound(false)
            } else setNotFound(true)
        })
        return () => stopQuantity()
    }, [fetchProduct])

    const upperCaseCategory = product.category && product.category[0].toUpperCase() + product.category.slice(1)

    function getRatingStars() {
        let rate = product?.rating?.rate
        const starsArray = []
        for (let i = 0; i < 5; i++) {
            if (rate >= 1) {
                starsArray.push(fullStar)
                rate--
            } else if (rate > 0) {
                rate = 0
                starsArray.push(halfStar)
            } else starsArray.push(emptyStar)
        }

        return <div
            className="product_rating"
            onMouseOver={() => setIsMouseOver(prev => ({ ...prev, div: true }))}
            onMouseLeave={() => setIsMouseOver(prev => ({ ...prev, div: false }))}
        >
            {starsArray.map((star, index) => (
                <img
                    className="product_rating_star"
                    key={index}
                    src={isMouseOver.div ? (userInicialRate[index] ? fullStar : emptyStar) : star}
                    onClick={() => rateProduct(index)}
                    onMouseOver={() => lightStars(index)}
                    onMouseLeave={() => setIsMouseOver(prev => ({ ...prev, star: false }))}
                />
            ))}
        </div>
    }

    function lightStars(index) {
        setIsMouseOver(prev => ({ ...prev, star: true }))
        setUserInicialRate(prev => {
            for (const prop in prev)
                if (Number(prop) <= index) prev[prop] = true
                else prev[prop] = false

            return prev
        })
    }

    async function rateProduct(index) {
        if (!decryptedId) return
        const res = await rateProductFetch(decryptedId, decryptedToken, productId, index + 1)
        if (res) setFetchProduct(prev => !prev)
        else console.log(`Error fetching the rating: ${res}`)
    }

    function addToCart() {
        let cart = localStorage.getItem("cart")
        if (cart) cart = JSON.parse(AES.decrypt(cart, cartKey).toString(Utf8))
        else cart = []

        cart.push({ product, quantity })
        const encryptedCart = AES.encrypt(JSON.stringify(cart), cartKey).toString()
        localStorage.setItem("cart", encryptedCart)
        setIsAddedToCart(true)
    }

    function getRateCount() {
        const rate = product.rating?.rate
        const fixedRate = rate % 1 === 0 ? rate?.toFixed(0) : rate?.toFixed(1)
        const count = product.rating?.count
        return <span className="product_rating_count">
            {fixedRate} ({`${count} review${count === 1 ? "" : "s"}`})
        </span>
    }

    function startQuantity(quantity) {
        setQuantity(prev => prev + quantity > 0 && prev + quantity <= product.stock ? prev + quantity : prev)
        stopQuantity()
        intervalRef.current = setInterval(() => {
            setQuantity(prev => prev + quantity > 0 && prev + quantity <= product.stock ? prev + quantity : prev)
        }, 150)
    }

    function stopQuantity() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className="product" style={{ backgroundColor: notFound ? "white" : "rgba(255, 250, 239, 0.377)" }}>
            <Header />
            {notFound ?
                <ProductNotFound content="Product not found" isSingle={true} />
                :
                product.title ?
                    <ProductComponent
                        product={product}
                        quantity={quantity}
                        upperCaseCategory={upperCaseCategory}
                        getRatingStars={getRatingStars}
                        getRateCount={getRateCount}
                        startQuantity={startQuantity}
                        stopQuantity={stopQuantity}
                        addToCart={addToCart}
                        isAddedToCart={isAddedToCart}
                        isAdmin={isAdmin}
                    />
                    :
                    <ProductSkeleton />
            }
            <Footer />
        </div>
    )
}