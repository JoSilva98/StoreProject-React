export default async function getUsersList(decryptedToken, { word, direction, page, pageSize }) {
    const request = {
        headers: {
            "Content-Type": "application/json",
            Authorization: decryptedToken
        }
    }

    const res = await fetch(`/api/v1/admins/users?word=${word}&direction=${direction}&page=${page}&pagesize=${pageSize}`, request)
    if (res.status !== 200) return res
    
    const json = await res.json()
    const numberOfUsers = res.headers.get("Number-of-Users")
    return { json, numberOfUsers }
}