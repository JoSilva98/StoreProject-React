export default async function deleteProductFetch(productId, userToken) {
    await fetch(`/api/v1/admins/products/${productId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: userToken
        }
    })
}