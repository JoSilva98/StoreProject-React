export default async function validateLogin({ email, password }) {
    return await fetch(process.env.REACT_APP_API_BASE_URL + "/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}