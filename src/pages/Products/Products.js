import "./style.css"
import { useContext, useEffect, useRef, useState } from "react"
import ProductNotFound from "../../components/ProductNotFound/ProductNotFound"
import getProducts from "../../services/getProducts"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import SideBar from "../../components/SideBar/SideBar"
import SingleProduct from "../../components/SingleProduct/SingleProduct"
import PageButtons from "../../components/PageButtons/PageButtons"
import ProductsSkeleton from "../../components/ProductsSkeleton/ProductsSkeleton"
import useChooseLink from "../../hooks/useChooseLink"
import { linkTypes } from "../../enums/linkTypes"
import { useLocation } from "react-router-dom"
import { searchContext } from "../../context/searchContext"

export default function Products() {
    const [isLoading, setIsLoading] = useState(false)
    const { searchParams, updateSearchParams } = useContext(searchContext)
    const chooseLink = useChooseLink(linkTypes)
    const location = useLocation()

    const [linkProps, setLinkProps] = useState({
        direction: "ASC",
        field: "title",
        page: 1,
        pageSize: 12,
        category: location.state?.category || "",
        price: { min: 0, max: 0 },
        rating: { min: 0, max: 0 },
        title: location.state?.category || searchParams.value
    })

    const [linkType, setLinkType] = useState("main")
    const [link, setLink] = useState(chooseLink("title", linkProps))
    const [products, setProducts] = useState([])
    const [refreshProducts, setRefreshProducts] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState()

    useEffect(() => {
        getProducts(link, setIsLoading).then(({ json, numberOfProds }) => {
            if (json.length > 0) {
                setProducts(json)
                setNotFound(false)
                setNumberOfPages(() => Math.ceil(numberOfProds / (linkProps.pageSize) || 12))
            } else setNotFound(true)
        })
    }, [linkProps.page, linkProps.direction, link, refreshProducts])

    useEffect(() => {
        const newProps = { ...linkProps, title: location.state?.category || searchParams.value, page: 1 }
        let newType = linkType

        if (linkType === "main") newType = "title"
        const rightLink = chooseLink(newType, newProps)

        setLink((() => rightLink))
        setLinkType(() => newType)
        setLinkProps(() => newProps)
    }, [searchParams.search])

    function changeLinkProps(linkProp, params) {
        setLinkProps(prev => {
            let newProps
            if (linkProp === "main") newProps = { ...prev, page: 1, direction: "ASC", title: "" }
            else {
                let newTitle = linkProp === "direction" ? prev.title : ""
                updateSearchParams(newTitle)

                newProps = {
                    ...prev,
                    page: 1,
                    [linkProp]: params,
                    title: newTitle
                }
            }

            const newType = linkProp === "direction" ? linkType : linkProp
            setLink(() => chooseLink(newType, newProps))
            setLinkType(newType)
            return newProps
        })
    }

    function movePage(numberOfPages) {
        setLinkProps(prev => {
            setIsLoading(() => true)
            const newProps = { ...prev, page: prev.page + numberOfPages }
            setLink(() => chooseLink(linkType, newProps))
            return newProps
        })
    }

    return (
        <div className="products">
            <Header />
            <main>
                <SideBar changeLinkProps={changeLinkProps} />

                {notFound ?
                    <ProductNotFound content="Products not found" isSingle={false} />
                    :
                    <div className="product_list_div">
                        <div className="product_list">
                            {products.length === 0 ?
                                <ProductsSkeleton pageSize={linkProps.pageSize} /> :
                                products.map(prod => <SingleProduct key={prod.id} product={prod} setRefreshProducts={setRefreshProducts} />)
                            }
                        </div>

                        <PageButtons 
                            page={linkProps.page}
                            isLoading={isLoading}
                            movePage={movePage}
                            numberOfPages={numberOfPages}
                        />
                    </div>
                }
            </main>
            <Footer />
        </div>
    )
}