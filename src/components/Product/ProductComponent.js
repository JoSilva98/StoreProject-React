import { useNavigate } from "react-router-dom"
import arrowLeft from "../../assets/arrow-left.png"
import "./style.css"

export default function ProductComponent(props) {
    const navigate = useNavigate()
    const {
        product,
        quantity,
        upperCaseCategory,
        getRatingStars,
        getRateCount,
        startQuantity,
        stopQuantity,
        addToCart,
        isAddedToCart,
        isAdmin
    } = props

    return (
        <main className="product_main">
            <div className="product_main_div">
                <img className="product_image" src={product.image} />
                <div className="product_structure">
                    <div className="product_info">
                        <h3>{upperCaseCategory}</h3>
                        <h1>{product.title}</h1>
                        <div className="product_rating">
                            {getRatingStars()}
                            {getRateCount()}
                        </div>
                        <h2>{product.price}€</h2>
                        <p className="product_description">{product.description}</p>
                    </div>
                    <div className="product_buttons">
                        <div className="product_quantity_buttons">
                            <button
                                className="product_quantity_button"
                                onMouseDown={() => startQuantity(-1)}
                                onMouseUp={stopQuantity}
                                disabled={isAddedToCart}
                            >-</button>
                            <p className="product_quantity_value">{quantity}</p>
                            <button
                                className="product_quantity_button"
                                onMouseDown={() => startQuantity(1)}
                                onMouseUp={stopQuantity}
                                disabled={isAddedToCart}
                            >+</button>
                        </div>
                        <button
                            className="product_cart_button"
                            onClick={addToCart}
                            disabled={isAddedToCart || product.stock === 0}
                        >
                            {isAddedToCart ? "Added!" :
                                product.stock === 0 ? "Sold Out" : "Add to cart"}
                        </button>
                    </div>
                    <p className="product_quantity_stock">In Stock: <b>{product.stock}</b></p>

                    <div className="product_extra_buttons">
                        <button className="product_extra_button" onClick={() => navigate("/products")}>
                            <img src={arrowLeft} /> Back to Product List
                        </button>
                        {isAdmin &&
                            <button className="product_extra_button" onClick={() => navigate(`/product/update/${product.id}`)}>
                                Update Product
                            </button>
                        }
                    </div>

                </div>
            </div>
        </main>
    )
}