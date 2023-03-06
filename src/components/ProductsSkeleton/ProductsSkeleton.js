import "./style.css"

export default function ProductsSkeleton({ pageSize }) {
    function generateSquares() {
        const array = []
        for (let i = 0; i < pageSize; i++) {
            array.push(<div className="single_product_grey_square" />)
        }

        return array.map((elm, i) => <div key={i} className="single_product" >{elm}</div>)
    }

    return generateSquares()
}