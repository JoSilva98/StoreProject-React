export default async function decodeMessage(res) {
    const decoder = new TextDecoder()
    const message = (await res.body.getReader().read()).value
    const jsonMessage = JSON.parse(decoder.decode(message))
    const propArray = Object.getOwnPropertyNames(jsonMessage)
    return { propArray, jsonMessage }
}