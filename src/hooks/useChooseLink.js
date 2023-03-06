export default function useChooseLink(props) {
    const { Main, Category, Rating, Price, Title } = props

    function chooseLink(linkType, linkProps) {
        let { direction, page, pageSize, title } = linkProps
        if (title.length > 100) title = title.slice(0, 100)

        switch (linkType) {
            case Main: {
                let { field } = linkProps
                if (field.length > 100) field = field.slice(0, 100)
                return `?direction=${direction}&field=${field}&page=${page}&pagesize=${pageSize}`
            }
            case Category: {
                let { category, title } = linkProps
                if (category.length > 100) category = category.slice(0, 100)
                return `/category?direction=${direction}&category=${category}&title=${title}&page=${page}&pagesize=${pageSize}`
            }
            case Rating: {
                const { rating, title } = linkProps
                const { min, max } = rating
                return `/rating?direction=${direction}&title=${title}&page=${page}&pagesize=${pageSize}&min=${min}&max=${max}`
            }
            case Price: {
                const { price, title } = linkProps
                const { min, max } = price
                return `/price?direction=${direction}&title=${title}&page=${page}&pagesize=${pageSize}&min=${min}&max=${max}`
            }
            case Title: {
                const { title, page, pageSize } = linkProps
                return `/title?title=${title.trim()}&direction=${direction}&page=${page}&pagesize=${pageSize}`
            }
            default: console.log(`O Link Type está errado: ${linkType}`)
        }
    }

    return chooseLink
}