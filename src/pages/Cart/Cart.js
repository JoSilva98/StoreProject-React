import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useEffect, useRef, useState } from "react"
import { AES } from "crypto-js"
import { cartKey } from "../../secretKeys"
import Utf8 from "crypto-js/enc-utf8"
import CartForm from "../../components/CartForm/CartForm"
import CartSingleProduct from "../../components/CartSingleProduct/CartSingleProduct"
import Login from "../Login/Login"
import useUserInfo from "../../hooks/useUserInfo"
import completeCheckout from "../../services/completeCheckout"

export default function Cart() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [isOverlay, setIsOverlay] = useState(false)
    const { decryptedId } = useUserInfo()
    const [status, setStatus] = useState({ success: false, empty: false, error: false })
    const loginRef = useRef(null)

    const [formData, setFormData] = useState({
        firstName: { value: "", isFilled: true },
        lastName: { value: "", isFilled: true },
        phoneNumber: { value: "", isFilled: true },
        email: { value: "", isFilled: true, isWrong: false },
        address: { value: "", isFilled: true }
    })

    useEffect(() => {
        let cart = localStorage.getItem("cart")

        if (cart) cart = JSON.parse(AES.decrypt(cart, cartKey).toString(Utf8))
        else cart = []

        if (cart.length > 0) {
            setTotal(() => (
                cart.map(prod => prod.product.price * prod.quantity).reduce((acc, curr) => acc + curr).toFixed(2)
            ))
        } else cart = []

        setProducts(() => cart)
        return () => setStatus(() => ({ success: false, empty: false, error: false }))
    }, [])

    useEffect(() => {
        document.addEventListener("click", closeOpenOverlay)
        return () => document.removeEventListener("click", closeOpenOverlay)
    }, [isOverlay])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: { ...prev[name], value } }))
    }

    function updateFormData(prop, isFilled, isWrong) {
        setFormData(prev => ({
            ...prev,
            [prop]: {
                ...prev[prop],
                isFilled,
                isWrong: isWrong || false
            }
        }))
    }

    function buyProds(event) {
        event.preventDefault()
        let isFormValid = true
        setFormData(prev => ({ ...prev, email: { ...prev.email, isWrong: false } }))

        for (const prop in formData)
            if (!formData[prop].value) {
                console.log(formData[prop].value)
                updateFormData(prop, false)
                isFormValid = false
            }
            else updateFormData(prop, true)

        const params = { foundAt: -1, foundDot: -1 }
        for (let i = 0; i < formData.email.value.length; i++) {
            if (formData.email.value[i] === "@") params.foundAt = i
            if (formData.email.value[i] === ".") params.foundDot = i
        }

        if (params.foundAt + 2 > params.foundDot || params.foundAt < 2
            || params.foundDot + 2 >= formData.email.value.length) {
            isFormValid = false
            setFormData(prev => ({ ...prev, email: { ...prev.email, isWrong: true } }))
        }

        if (isFormValid) checkOut()
    }

    async function checkOut() {
        if (products.length === 0) {
            setStatus(() => ({ success: false, empty: true, error: false }))

            setInterval(() => {
                setStatus(() => ({ success: false, empty: false, error: false }))
            }, 3000);
            return
        }
        const res = await completeCheckout(products.map(prod => ({ productId: prod.product.id, bought: prod.quantity })))
        if (res.status === 200) {
            setStatus(() => ({ success: true, empty: false, error: false }))
            setTotal(0)

            setInterval(() => {
                setStatus(prev => ({ ...prev, success: false }))
            }, 3000)
        }
        else {
            setStatus(() => ({ success: false, empty: false, error: true }))

            setInterval(() => {
                setStatus(() => ({ success: false, empty: false, error: false }))
            }, 3000);
            console.log(res)
        }

        setProducts([])
        const encryptedCart = AES.encrypt(JSON.stringify([]), cartKey).toString()
        localStorage.setItem("cart", encryptedCart)
        console.log(res)
    }

    async function refreshQuantity(newQuant, prodId) {
        setProducts(prev => {
            let count = 0

            const newProds = prev.map(prod => {
                if (prod.product.id === prodId) prod.quantity = newQuant

                count += prod.product.price * prod.quantity
                return prod
            })

            const encryptedCart = AES.encrypt(JSON.stringify(newProds), cartKey).toString()
            localStorage.setItem("cart", encryptedCart)

            setTotal(() => count.toFixed(2))
            return newProds
        })
    }

    function removeProduct(prodId) {
        setProducts(prev => {
            const newProds = prev.filter(obj => obj.product.id !== prodId)
            const encryptedCart = AES.encrypt(JSON.stringify(newProds), cartKey).toString()
            localStorage.setItem("cart", encryptedCart)

            setTotal(() => newProds.map(prod => prod.product.price).reduce((a, b) => a + b, 0))
            return newProds
        })
    }

    function emptyCart() {
        setProducts(() => [])
        setTotal(() => 0)
        localStorage.setItem("cart", AES.encrypt(JSON.stringify([]), cartKey).toString())
    }

    function displayProds() {
        return products.map((obj, index) => <CartSingleProduct
            key={index} obj={obj} refreshQuantity={refreshQuantity} removeProduct={removeProduct} />)
    }

    function closeOpenOverlay(e) {
        e.preventDefault()
        if (!isOverlay && e.target.id === "login_button") setIsOverlay(true)
        else if (loginRef.current && !loginRef.current.contains(e.target))
            setIsOverlay(false)
    }

    return (
        <div className="cart">
            <Header />
            <CartForm
                displayProds={displayProds}
                total={total}
                emptyCart={emptyCart}
                decryptedId={decryptedId}
                checkOut={checkOut}
                status={status}
                formData={formData}
                handleChange={handleChange}
                buyProds={buyProds}
            />
            {isOverlay && <Login isOverlay={true} loginRef={loginRef} />}
            <Footer />
        </div>
    )
}