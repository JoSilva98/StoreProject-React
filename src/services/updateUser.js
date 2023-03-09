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
    
    return await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`, request)
}