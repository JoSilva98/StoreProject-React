export default async function deleteProductFetch(productId, userToken) {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/admins/products/${productId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: userToken
        }
    })
}