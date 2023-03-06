import "./style.css"
import notFoundImg from "../../assets/product-404.png"

export default function ProductNotFound({ content, isSingle }) {
    return <div className={isSingle ? "product_not_found_single" : "product_not_found_multiple"}>
        <div className="product_not_found_main">
            <div className="product_not_found">
                <img src={notFoundImg} />
                <h1 style={{ fontSize: isSingle ? "32px" : "" }}>{content}</h1>
            </div>
        </div>
    </div>
}