export default async function getSingleProduct(id) {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/users/products/${id}`
    const res = await fetch(url)
    if (res.status !== 200) {
        console.log("Error: " + res)
        return {}
    }

    return res.json()
} 