export default async function getProductsTitles() {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/products/titles`)
    if (res.status === 200) return await res.json()
    return res
}