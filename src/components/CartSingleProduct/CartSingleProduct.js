import { useEffect, useRef, useState } from "react"
import removeItem from "../../assets/remove-prod.png"
import "./style.css"
import { useNavigate } from "react-router-dom"

export default function CartSingleProduct({ obj, refreshQuantity, removeProduct }) {
    const [quantity, setQuantity] = useState(obj.quantity)
    const intervalRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        return () => stopQuantity()
    }, [])

    function startQuantity(quantity) {
        setQuantity(prev => prev + quantity > 0 && prev + quantity <= obj.product.stock ? prev + quantity : prev)
        stopQuantity()
        intervalRef.current = setInterval(() => {
            setQuantity(prev => prev + quantity > 0 && prev + quantity <= obj.product.stock ? prev + quantity : prev)
        }, 150)
    }

    function stopQuantity() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return <div className="cart_prod">
        <img className="cart_prod_img" src={obj.product.image} onClick={() => navigate(`/product/${obj.product.id}`)} />
        <div className="cart_prod_main">
            <div className="cart_prod_info">
                <p className="cart_prods_title" onClick={() => navigate(`/product/${obj.product.id}`)}>{obj.product.title}</p>
                <p className="cart_prods_price" onClick={() => navigate(`/product/${obj.product.id}`)}>{obj.product.price * obj.quantity}€</p>
            </div>
            <div className="cart_prod_buttons">
                <div className="cart_prod_quantity">
                    <button
                        onMouseDown={() => startQuantity(-1)}
                        onMouseUp={stopQuantity}
                        onClick={() => refreshQuantity(quantity, obj.product.id)}
                    >-</button>
                    <p>{quantity}</p>
                    <button
                        onMouseDown={() => startQuantity(1)}
                        onMouseUp={stopQuantity}
                        onClick={() => refreshQuantity(quantity, obj.product.id)}
                    >+</button>

                </div>
                <img className="cart_prod_trash" src={removeItem} onClick={() => removeProduct(obj.product.id)} />
            </div>
        </div>
    </div>
}