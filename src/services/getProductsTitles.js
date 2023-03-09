export default async function getProductsTitles() {
    const res = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/v1/users/products/titles")
    if (res.status === 200) return await res.json()
    return res
}