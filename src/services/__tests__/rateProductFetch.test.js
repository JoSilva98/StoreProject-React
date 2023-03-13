import rateProductFetch from "../rateProductFetch"

describe("rateProductFetch", () => {
    beforeEach(() => {
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("should rate a product", async () => {
        global.fetch = jest.fn()
        global.fetch.mockResolvedValueOnce({ status: 200 })
        const result = await rateProductFetch()
        expect(result).toEqual(true)
    })

    test("should fail rating a product", async () => {
        global.fetch = jest.fn()
        global.fetch.mockResolvedValueOnce({ status: 500 })
        const result = await rateProductFetch()
        expect(result).toEqual(false)
    })
})