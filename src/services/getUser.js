export default async function getUser({ id, token }, isAdmin) {
    const request = {
        headers: {
            "Content-type": "application/json",
            Authorization: token
        }
    }

    const link = process.env.REACT_APP_API_BASE_URL + (isAdmin ? "/api/v1/admins/users/" : "/api/v1/users/")
    const res = await fetch(link + id, request)
    if (res.status === 200) return res

    console.log(token)
    return {}
}