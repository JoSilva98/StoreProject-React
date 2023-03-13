import addProductFetch from "../addProductFetch"

describe("addProductFetch", () => {
    test("should add a product", async () => {
        global.fetch = jest.fn()
        global.fetch.mockResolvedValueOnce({ status: 200 })

        const formData = {
            title: { value: "title" },
            price: { value: "price" },
            description: { value: "description" },
            category: { value: "category" },
            image: { value: "image" },
            stock: { value: "stock" }
        }

        const result = await addProductFetch("", formData)
        
        expect(result).toEqual({ status: 200 })
    })
})