import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ProductNotFound from "../../components/ProductNotFound/ProductNotFound"
import UpdateProductForm from "../../components/UpdateProductForm/UpdateProductForm"
import useUserInfo from "../../hooks/useUserInfo"
import getProducts from "../../services/getProducts"
import updateProductFetch from "../../services/updateProductFetch"
import "./style.css"

export default function UpdateProduct() {
    const { decryptedToken, isAdmin } = useUserInfo()
    const { id: productId } = useParams()
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState({ isUpdated: false, isEmpty: false, error: "" })

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        stockPieces: "",
    })

    useEffect(() => {
        getProducts(`/${productId}`).then(json => {
            setLoading(true)
            json ? setNotFound(false) : setNotFound(true)
            setLoading(false)
        })
    }, [])

    function addFormDataValues(event) {
        let { name, value } = event.target
        setStatus(({ isUpdated: false, isEmpty: false, error: "" }))

        if (name === "price" || name === "stockPieces") {
            if (value < Number(event.target.min)) value = event.target.min
            if (value > Number(event.target.max)) value = event.target.max
        } else if (value.length > event.target.maxLength)
            value = formData[name]

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    async function updateProduct(event) {
        event.preventDefault()

        setStatus(({ isUpdated: false, isEmpty: false, error: "" }))

        let foundSome = false
        for (const prop in formData)
            if (formData[prop].trim()) foundSome = true

        if (!foundSome) {
            setStatus(prev => ({ ...prev, isEmpty: true }))
            return
        }

        const res = await updateProductFetch(productId, decryptedToken, formData)

        if (res.status === 200) {
            setFormData(prev => {
                const refreshedForm = {}
                for (const prop in prev)
                    refreshedForm[prop] = ""

                return refreshedForm
            })
            setStatus(prev => ({ ...prev, isUpdated: true }))
        } else {
            const message = new TextDecoder().decode((await res.body.getReader().read()).value)
            setStatus(prev => ({ ...prev, error: message }))
        }
    }

    return isAdmin ?
        <div className="update_product">
            <Header />
            {notFound ?
                <ProductNotFound content="Product not found" />
                :
                loading ?
                    <div className="update_product_main" style={{ minHeight: "770px" }}>
                        <div className="update_product_main_div" />
                    </div>
                    :
                    <UpdateProductForm
                        formData={formData}
                        addFormDataValues={addFormDataValues}
                        updateProduct={updateProduct}
                        status={status}
                        productId={productId}
                    />
            }
            <Footer />
        </div> : <Navigate to="/" />
}