export default async function completeCheckout(prods) {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prods)
    }

    return await fetch(`${process.env.API_URL}/api/v1/users/buy`, request)
}