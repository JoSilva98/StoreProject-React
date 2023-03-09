export default async function updateUser(id, token, formData) {
    const request = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            firstName: formData.firstName.value.trim(),
            lastName: formData.lastName.value.trim(),
            email: formData.email.value.trim(),
            password: formData.password.value.trim(),
            address: formData.address.value.trim(),
        })
    }
    
    return await fetch(`https://store-project-production.up.railway.app/api/v1/users/${id}`, request)
}