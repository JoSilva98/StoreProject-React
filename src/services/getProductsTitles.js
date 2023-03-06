export default async function getProductsTitles() {
    const res = await fetch("/api/v1/users/products/titles")
    if (res.status === 200) return await res.json()
    return res
}