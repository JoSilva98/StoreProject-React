import "./style.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import addProductFetch from "../../services/addProductFetch"
import useUserInfo from "../../hooks/useUserInfo"

export default function AddProduct() {
    const navigate = useNavigate()
    const { decryptedToken, isAdmin } = useUserInfo()
    const [status, setStatus] = useState({ isAdded: false, error: false, errorMessage: "" })
    const [formData, setFormData] = useState({
        title: { value: "", isFilled: true },
        price: { value: "", isFilled: true },
        description: { value: "", isFilled: true },
        category: { value: "", isFilled: true },
        image: { value: "", isFilled: true },
        stock: { value: "", isFilled: true }
    })

    function handleChange(e) {
        setStatus({ isAdded: false, error: false })
        let { name, value } = e.target

        setFormData(prev => {
            if (name === "price") {
                if (value < 0) value = 0
                if (value > 1000000) value = 1000000
            } else if (name === "stock") {
                if (value < 0) value = 0
                if (value > 100000) value = 100000
            }

            return { ...prev, [name]: { ...prev[name], value } }
        })
    }

    async function addProduct(e) {
        e.preventDefault()
        let isFormValid = true

        for (const prop in formData)
            if (!formData[prop].value) {
                isFormValid = false
                setFormData(prev => ({ ...prev, [prop]: { ...prev[prop], isFilled: false } }))
            } else setFormData(prev => ({ ...prev, [prop]: { ...prev[prop], isFilled: true } }))

        if (!isFormValid) return
        const res = await addProductFetch(decryptedToken, formData)

        if (res.status === 200) {
            console.log(await (res.body.getReader().read()).value)
            setStatus(prev => ({ ...prev, isAdded: true }))
            setFormData(prev => {
                const newForm = {}
                for (const prop in prev)
                    newForm[prop] = { value: "", isFilled: true }

                return newForm
            })
        }
        else {
            const decoder = new TextDecoder()
            const errorMessage = decoder.decode((await res.body.getReader().read()).value)
            setStatus(prev => ({ ...prev, error: true, errorMessage }))
        }
    }

    console.log(formData)

    return isAdmin ?
        <div>
            <Header />
            <main className="update_product_main">
                <div className="update_product_main_div">
                    <h1 className="update_product_title">Add Product</h1>

                    <form className="update_product_form">
                        <input
                            className={formData.title.isFilled ? "register_input" : "register_empty_input"}
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={formData.title.value}
                            onChange={handleChange}
                            maxLength={60}
                        />

                        <input
                            className={formData.price.isFilled ? "register_input" : "register_empty_input"}
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={formData.price.value}
                            onChange={handleChange}
                            min={0}
                            max={1000000}
                        />

                        <select
                            className={formData.category.isFilled ? "update_product_select" : "update_product_empty_select"}
                            value={formData.category.value}
                            onChange={handleChange}
                            name="category"
                        >
                            <option value="">-- Choose Category --</option>
                            <option value="women's clothing">Women's clothing</option>
                            <option value="men's clothing">Men's clothing</option>
                            <option value="jewelery">Jewelery</option>
                        </select>

                        <input
                            className={formData.image.isFilled ? "register_input" : "register_empty_input"}
                            type="text"
                            placeholder="Image URL"
                            name="image"
                            value={formData.image.value}
                            onChange={handleChange}
                            maxLength={150}
                        />

                        <input
                            className={formData.stock.isFilled ? "register_input" : "register_empty_input"}
                            type="number"
                            placeholder="Pieces in stock"
                            name="stock"
                            value={formData.stock.value}
                            onChange={handleChange}
                            min={0}
                            max={100000}
                        />

                        <textarea
                            className={formData.description.isFilled ? "register_input" : "register_empty_input"}
                            placeholder="Description"
                            name="description"
                            value={formData.description.value}
                            onChange={handleChange}
                            maxLength={700}
                        />
                        <button className="update_product_button" onClick={addProduct}>Add Product</button>
                        <button className="update_product_button" onClick={() => navigate("/products")}>Back to Product Page</button>
                    </form>
                </div>
                <div className="update_product_message">
                    {status.isAdded && <p className="update_product_message_success">Product Added!</p>}
                    {status.error && <p className="update_product_message_error">{status.errorMessage || "An error as occurred"}</p>}
                </div>
            </main>
            <Footer />
        </div>
        :
        <Navigate to="/" />
}