import "./style.css"
import Header from "../../components/Header/Header"
import Hero from "../../components/Hero/Hero"
import Footer from "../../components/Footer/Footer"

export default function Home() {
    return (
        <div className="home_page">
            <Header />
            <Hero />
            <Footer />
        </div>
    )
}