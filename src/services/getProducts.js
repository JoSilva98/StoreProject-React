export default async function getProducts(link, setIsLoading) {
    setIsLoading && setIsLoading(true)
    const res = await fetch(`https://store-project-production.up.railway.app/api/v1/users/products${link}`)

    if (res.status !== 200) {
        const json = []
        console.log(res)
        return { json }
    }

    const json = await res.json()
    setIsLoading && setIsLoading(false)
    const numberOfProds = res.headers.get("Number-of-Products")

    console.log(res.headers)
    return { json, numberOfProds }
}