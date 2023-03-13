import getProducts from "../getProducts"

describe("getProducts", () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("should get products list", async () => {
        // global.fetch.mockReturnValue(1) para retornar um valor
        // global.fetch.mockResolvedValue(1) para retornar uma promisse
        // global.fetch.mockRejectedValue(new Error("...")) para simular um erro. A chamada de global.fetch deve estar dentro de um try catch

        const numberOfProds = "1"
        const headers = { get: () => numberOfProds }
        const json = [
            {
                id: 1,
                title: "Product 1",
                price: 49.99,
                description: "Large Description",
                category: "women's clothing",
                image: "Image URL",
                stock: 5,
                rating: {
                    id: 35,
                    rate: 3.5,
                    count: 4
                }
            }
        ]

        global.fetch.mockResolvedValueOnce({
            status: 200,
            headers,
            json: () => Promise.resolve(json)
        })

        const result = await getProducts("")
        expect(result).toEqual({ json, numberOfProds })
    })

    test("should fail getting products list", async () => {
        global.fetch.mockResolvedValueOnce({ status: 500 })
        const result = await getProducts("")
        expect(result).toEqual({ json: [] })
    })
})