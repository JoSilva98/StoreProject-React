import Products from "../Products";
import getProducts from "../../../services/getProducts";
import { MemoryRouter } from "react-router-dom";
import { SearchContextProvider } from "../../../context/searchContext";
import { LoginContextProvider } from "../../../context/loginContext";
import { act, render, screen } from "@testing-library/react"

jest.mock("../../../services/getProducts")

test("should fetch products and save them on a state", async () => {
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
    
    getProducts.mockImplementation(() => (
        Promise.resolve({ json, numberOfProds: 1 })
    ))

    // Serve para controlar a atualização de states
    await act(async () => render(
        <MemoryRouter>
            <SearchContextProvider>
                <LoginContextProvider>
                    <Products />
                </LoginContextProvider>
            </SearchContextProvider>
        </MemoryRouter>
    ))

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(await getProducts()).toEqual({ json, numberOfProds: 1 })
})