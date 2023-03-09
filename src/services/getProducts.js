export default async function getProducts(link, setIsLoading) {
    setIsLoading && setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/products${link}`)

    if (res.status !== 200) {
        const json = []
        console.log(res)
        return { json }
    }

    const json = await res.json()
    setIsLoading && setIsLoading(false)
    const numberOfProds = res.headers.get("Number-of-Products")
    console.log(numberOfProds)
    return { json, numberOfProds }
}