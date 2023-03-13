import '@testing-library/jest-dom'
import { render, screen, cleanup } from "@testing-library/react"
import renderer from "react-test-renderer"
import Footer from "../Footer"

test("should render Footer", () => {
    render(<Footer />)

    // Vai buscar a componente renderizada com base no id
    const footerElement = screen.getByTestId("footer-1")

    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveTextContent("João Silva© 2023. All Rights Reserved.")
    expect(footerElement).not.toHaveTextContent("Hello World!")
})

test("Footer should match snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON()
    expect(tree).toMatchSnapshot()
})