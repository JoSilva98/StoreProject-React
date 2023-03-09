export default async function getSingleProduct(id) {
    const url = `https://store-project-production.up.railway.app/api/v1/users/products/${id}`
    const res = await fetch(url)
    if (res.status !== 200) {
        console.log("Error: " + res)
        return {}
    }

    return res.json()
} 