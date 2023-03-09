export default async function updateProductFetch(productId, userToken, formData) {
    const request = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: userToken
        },
        body: JSON.stringify({
            title: formData.title.trim(),
            price: formData.price || -1,
            description: formData.description.trim(),
            category: formData.category,
            image: formData.image.trim(),
            stock: formData.stockPieces || -1
        })
    }

    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/admins/products/${productId}`, request)
    return res
}