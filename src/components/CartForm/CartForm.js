import "./style.css"
import arrowLeft from "../../assets/arrow-left.png"
import cleanCart from "../../assets/empty-cart.png"
import { useNavigate } from "react-router-dom"

export default function CartForm(props) {
    const navigate = useNavigate()
    const { displayProds,
        total,
        emptyCart,
        decryptedId,
        checkOut,
        status,
        formData,
        handleChange,
        buyProds
    } = props

    return <main className="cart_main">
        <div className="cart_prods_div">
            <h1>Shopping Cart</h1>
            <div className="cart_prods_extra_buttons">
                <button onClick={() => navigate("/products")}>
                    <img className="cart_prods_arrow" src={arrowLeft} /> Back to Product List
                </button>
                <img src={cleanCart} onClick={emptyCart} />
            </div>
            <div className="cart_products">
                {displayProds()}
            </div>
        </div>
        <div className="cart_summary">
            <h2>Summary</h2>
            <div className="cart_total">
                <p>Total:</p>
                <p className="cart_prods_total">{total}€</p>
            </div>
            {!decryptedId ?
                <form>
                    <input
                        className={formData.firstName.isFilled ? "cart_summary_input" : "cart_summary_input_empty"}
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName.value}
                        onChange={handleChange}
                        maxLength={30}
                    />

                    <input
                        className={formData.lastName.isFilled ? "cart_summary_input" : "cart_summary_input_empty"}
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName.value}
                        onChange={handleChange}
                        maxLength={30}
                    />

                    <input
                        className={formData.phoneNumber.isFilled ? "cart_summary_input" : "cart_summary_input_empty"}
                        placeholder="Phone Number"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber.value}
                        onChange={handleChange}
                        maxLength={20}
                    />

                    <input
                        className={formData.email.isFilled && !formData.email.isWrong ? "cart_summary_input" : "cart_summary_input_empty"}
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email.value}
                        onChange={handleChange}
                        maxLength={30}
                    />
                    {formData.email.isFilled && formData.email.isWrong && <p className="error_message">Must be a well-formed email</p>}

                    <input
                        className={formData.address.isFilled ? "cart_summary_input" : "cart_summary_input_empty"}
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={formData.address.value}
                        onChange={handleChange}
                        maxLength={40}
                    />

                    <div className="cart_buttons_div">
                        <div className="cart_buttons">
                            <button id="login_button">Login</button>
                            <p>Or</p>
                            <button onClick={buyProds}>Checkout</button>
                        </div>

                        <div>
                            {status.success && <p className="cart_prods_buy_complete">Completed Purchase!</p>}
                            {status.empty && <p className="cart_prods_buy_empty">Cart is Empty</p>}
                            {status.error && <p className="cart_prods_buy_error">An Error Ocurred</p>}
                        </div>
                    </div>
                </form> :
                <div className="cart_buttons_logged">
                    <button onClick={checkOut}>Checkout</button>
                    <div className="cart_prods_buy">
                        {status.success && <p className="cart_prods_buy_complete">Completed Purchase!</p>}
                        {status.empty && <p className="cart_prods_buy_empty">Cart is Empty</p>}
                        {status.error && <p className="cart_prods_buy_error">An Error Ocurred</p>}
                    </div>
                </div>}
        </div>
    </main>
}