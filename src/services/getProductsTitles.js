export default async function getProductsTitles() {
    const res = await fetch(`https://store-project-production.up.railway.app/api/v1/users/products/titles`)
    if (res.status === 200) return await res.json()
    return res
}