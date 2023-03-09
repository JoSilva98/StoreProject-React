export default async function completeCheckout(prods) {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prods)
    }

    return await fetch("https://store-project-production.up.railway.app/api/v1/users/buy", request)
}