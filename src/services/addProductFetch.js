export default async function addProductFetch(decryptedToken, formData) {
    const request = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: decryptedToken
        },
        body: JSON.stringify({
            title: formData.title.value,
            price: formData.price.value,
            description: formData.description.value,
            category: formData.category.value,
            image: formData.image.value,
            stock: formData.stock.value
        })
    }

    return await fetch(process.env.REACT_APP_API_BASE_URL + "/api/v1/admins/products", request)
}