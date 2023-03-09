export default async function submitRegistration(formData) {
    const trimData = {}

    for (const prop in formData) {
        trimData[prop] = formData[prop].value.trim()
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: trimData.firstName,
            lastName: trimData.lastName,
            email: trimData.email,
            password: trimData.password,
            dateOfBirth: trimData.dateOfBirth,
            address: trimData.address
        }),
    })

    return res
}