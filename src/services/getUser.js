export default async function getUser({ id, token }, isAdmin) {
    const request = {
        headers: {
            "Content-type": "application/json",
            Authorization: token
        }
    }

    const link = `https://store-project-production.up.railway.app${isAdmin ? "/api/v1/admins/users/" : "/api/v1/users/"}`
    const res = await fetch(link + id, request)
    if (res.status === 200) return res

    console.log(token)
    return {}
}