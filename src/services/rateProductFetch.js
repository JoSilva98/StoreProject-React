export default async function rateProductFetch(userId, userToken, productId, rate) {
    const request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: userToken
        }
    }

    const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/rating?userid=${userId}&productid=${productId}&rating=${rate}`,
        request
    )
    return res.status === 200
}