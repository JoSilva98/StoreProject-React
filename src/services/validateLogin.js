export default async function validateLogin({ email, password }) {
    return await fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}