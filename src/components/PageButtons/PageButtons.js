import { useNavigate } from "react-router-dom"
import useUserInfo from "../../hooks/useUserInfo"
import "./style.css"

export default function PageButtons({ page, isLoading, movePage, numberOfPages }) {
    const { isAdmin } = useUserInfo()
    const navigate = useNavigate()
    
    return (
        <div>
            <div className="page_buttons">
                {
                    page > 1 &&
                    <button
                        className="page_button"
                        onClick={() => movePage(-1)}
                        disabled={isLoading}
                    >
                        Previous Page
                    </button>
                }
                {
                    page < numberOfPages &&
                    <button
                        className="page_button"
                        onClick={() => movePage(1)}
                        disabled={isLoading}
                    >
                        Next Page
                    </button>
                }
            </div>
            <div className="page_text_div">
                <p className="page_text">Page {page}</p>
                {isAdmin &&
                    <button className="page_button" onClick={() => navigate("/addproduct")}>Add Product</button>
                }
            </div>
        </div>
    )
}