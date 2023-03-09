export default async function validateLogin({ email, password }) {
    return await fetch(`https://store-project-production.up.railway.app/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}