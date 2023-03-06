import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useEffect, useState } from "react"
import { AES } from "crypto-js"
import Utf8 from "crypto-js/enc-utf8"
import { wishListKey } from "../../secretKeys"
import SingleProductWish from "../../components/SingleProductWish/SingleProductWish"
import yeallowHeart from "../../assets/heart-yellow.png"

export default function WishList() {
    const [products, setProducts] = useState({})
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        setProducts(() => {
            let wishList = localStorage.getItem("wishList")
            if (!wishList) return {}

            return JSON.parse(AES.decrypt(wishList, wishListKey).toString(Utf8))
        })
    }, [refreshList])

    function removeProduct(productId) {
        setProducts(prev => {
            setRefreshList(prev => !prev)
            delete prev[productId]

            const encryptedList = AES.encrypt(JSON.stringify(prev), wishListKey).toString()
            localStorage.setItem("wishList", encryptedList)
            return prev
        })
    }

    function displayProducts() {
        const array = []
        for (const prop in products)
            array.push(products[prop])
        return array.map((prod, index) =>
            <SingleProductWish
                key={index}
                product={prod}
                removeProduct={removeProduct}
            />)
    }

    return (
        <div className="wish_list">
            <Header />
            <main className="wish_list_main">
                <div className="wish_list_title">
                    <img src={yeallowHeart} />
                    <h1>My Wish List</h1>
                </div>
                <div className="wish_products_list">
                    {displayProducts()}
                </div>
            </main>
            <Footer />
        </div>
    )
}