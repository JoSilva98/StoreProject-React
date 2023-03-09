export default async function deleteProductFetch(productId, userToken) {
    const res = await fetch(`${process.env.API_URL}/api/v1/admins/products/${productId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: userToken
        }
    })

    //console.log(res)
    console.log(new TextDecoder().decode((await res.body.getReader().read()).value))
}