import "./style.css"
import useGenerateForms from "../../../../hooks/useGenerateForms"
import { useContext } from "react"
import { radioContext } from "../../../../context/radioContext"
import { searchContext } from "../../../../context/searchContext"

export default function SideBarForm({ variables, functions }) {
    const { turnOffSearchBar } = useContext(searchContext)
    const { showForms, minPrice, maxPrice, minValMain, maxValMain, minStarMain, maxStarMain } = variables
    const { setMinValMain, setMaxValMain, setMinStarMain, setMaxStarMain, handleClick, changeLinkProps } = functions

    const { generateRange, generateButton, generateRadio } = useGenerateForms(showForms, handleClick)
    const { refreshRadio, refreshCategoryRadio } = useContext(radioContext)

    function handleFilter(event, minVal, maxVal, linkType) {
        event.preventDefault()
        let params = { min: minVal, max: maxVal }
        if (minVal > maxVal) params = { min: maxVal, max: minVal }
        changeLinkProps(linkType, params)
        refreshCategoryRadio()
    }

    function refreshSearch() {
        refreshRadio()
        changeLinkProps("main")
        setMinValMain(minPrice.max / 2)
        setMaxValMain((maxPrice.max - maxPrice.min) / 2)
        setMinStarMain(3)
        setMaxStarMain(3)
        turnOffSearchBar()
    }

    return (
        <div className="side_bar">
            <form className="side_bar_form1">
                {generateButton("Sort by", "showOrderForm", "main")}
                {showForms.main.showOrderForm &&
                    <fieldset className="side_bar_form_inputs">
                        {generateRadio("Ascending Order", "ASC", "direction",
                            () => changeLinkProps("direction", "ASC"))}
                        {generateRadio("Descending Order", "DESC", "direction",
                            () => changeLinkProps("direction", "DESC"))}
                    </fieldset>
                }
            </form>

            <div className="side_bar_form2_outer_div">
                {generateButton("Filter by", "showFilterForm", "main")}
                {showForms.main.showFilterForm &&
                    <div className="side_bar_form2_div">
                        <form className="side_bar_form2">
                            {generateButton("Category", "showCategoryForm", "secondary")}
                            {showForms.secondary.showCategoryForm &&
                                <fieldset className="side_bar_form_inputs">
                                    {generateRadio("Women's Clothing", "women's_clothing", "category",
                                        () => changeLinkProps("category", "women's+clothing"))}
                                    {generateRadio("Men's Clothing", "men's_clothing", "category",
                                        () => changeLinkProps("category", "men's+clothing"))}
                                    {generateRadio("Jewelery", "jewelery", "category",
                                        () => changeLinkProps("category", "jewelery"))}
                                </fieldset>
                            }
                        </form>

                        <form className="side_bar_form2">
                            {generateButton("Rating", "showRatingForm", "secondary")}
                            {showForms.secondary.showRatingForm &&
                                <fieldset className="side_bar_form_inputs">
                                    {generateRange("Minimum Rate", 1, 5, minStarMain, setMinStarMain)}
                                    {generateRange("Maximum Rate", 1, 5, maxStarMain, setMaxStarMain)}
                                    <button onClick={e => handleFilter(e, minStarMain, maxStarMain, "rating")}>Filter</button>
                                </fieldset>
                            }
                        </form>

                        <form className="side_bar_form2">
                            {generateButton("Price", "showPriceForm", "secondary")}
                            {showForms.secondary.showPriceForm &&
                                <fieldset className="side_bar_form_inputs">
                                    {generateRange("Minimum Price", minPrice.min, minPrice.max, minValMain, setMinValMain)}
                                    {generateRange("Maximum Price", maxPrice.min, maxPrice.max, maxValMain, setMaxValMain)}
                                    <button onClick={e => handleFilter(e, minValMain * 100, maxValMain * 100, "price")}>Filter</button>
                                </fieldset>
                            }
                        </form>
                    </div>
                }
            </div>
            <button className="refresh_button" onClick={refreshSearch}>Refresh Search</button>
        </div>
    )
}