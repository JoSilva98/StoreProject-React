import "./style.css"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import notFound from "../../assets/404-page.jpg"

export default function NotFound() {
    const [redirect, setRedirect] = useState(0)

    useEffect(() => {
        const int = setInterval(() => {
            setRedirect(prev => prev + 1)
        }, 1000)

        return () => clearInterval(int)
    }, [])

    function generateDots() {
        let dots = ""
        for (let i = 0; i < redirect; i++) dots += "."
        return dots
    }

    return (
        <div className="not_found">
            <img src={notFound} />
            <h2>Redirecting to Home{generateDots()}</h2>
            {redirect === 3 && <Navigate to="/" />}
        </div>
    )
} 