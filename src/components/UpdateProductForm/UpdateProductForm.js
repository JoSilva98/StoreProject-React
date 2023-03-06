import { useNavigate } from "react-router-dom"
import "./style.css"

export default function UpdateProductForm(props) {
    const navigate = useNavigate()
    const { formData, addFormDataValues, updateProduct, status, productId } = props

    return <main className="update_product_main">
        <div className="update_product_main_div">
            <h1 className="update_product_title">Update Product</h1>

            <form className="update_product_form">
                <input
                    className={"update_product_input"}
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={addFormDataValues}
                    maxLength={60}
                />

                <input
                    className={"update_product_input"}
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={addFormDataValues}
                    min={0}
                    max={1000000}
                />

                <select
                    className="update_product_select"
                    value={formData.category}
                    onChange={addFormDataValues}
                    name="category"
                >
                    <option value="">-- Choose Category --</option>
                    <option value="women's clothing">Women's clothing</option>
                    <option value="men's clothing">Men's clothing</option>
                    <option value="jewelery">Jewelery</option>
                </select>

                <input
                    className={"update_product_input"}
                    type="text"
                    placeholder="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={addFormDataValues}
                    maxLength={150}
                />

                <input
                    className={"update_product_input"}
                    type="number"
                    placeholder="Pieces in stock"
                    name="stockPieces"
                    value={formData.stockPieces}
                    onChange={addFormDataValues}
                    min={0}
                    max={100000}
                />

                <textarea
                    className={"update_product_input"}
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={addFormDataValues}
                    maxLength={700}
                />

                <button className="update_product_button" onClick={updateProduct}>Update Product</button>
                <button className="update_product_button" onClick={() => navigate(`/product/${productId}`)}>Back to Product Page</button>
            </form>
        </div>
        <div className="update_product_message">
            {status.isUpdated && <p className="update_product_message_success">Product Updated!</p>}
            {status.isEmpty && <p className="update_product_message_empty">No fields updated</p>}
            {status.error && <p className="update_product_message_error">{status.error}</p>}
        </div>
    </main>
}