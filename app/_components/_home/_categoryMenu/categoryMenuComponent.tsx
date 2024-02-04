import { Action } from "@/app/_models/_common/action";
import { Dispatch, FunctionComponent } from "react";
import { actionConstants } from "../../../_actions/_home/homeActionConstants";
import { errorToast } from "../../_common/_toast/toast";
import { Category, Product } from "@prisma/client";
import { SecondaryButton } from "../../_common/_buttons/buttons";
import { v4 as uuid } from 'uuid'; //uuid generator

interface CategoryMenuComponentProps {
    categories: Category[];
    dispatchHomeState: Dispatch<Action>;
}

export const CategoryMenuComponent: FunctionComponent<CategoryMenuComponentProps> = ({ categories, dispatchHomeState }) => {
    const fetchProductCatalogue = async (category: Category) => {//fetch product catalogue when staff clicks a category button
        try {
            dispatchHomeState({ type: actionConstants.loaderComponent.loading }) //start loading animation
            const response = await fetch(`/api/product/category/${category.categoryId}`); // Fetch data from your API route
            const productCatalogue: Product[] = await response.json(); // Extract JSON data from the response
            if (response.status === 500) {//capture error if response is 500
                throw new Error("Unable fetch product catalogue");
            }
            dispatchHomeState({ type: actionConstants.productCatalogueComponent.load, payload: productCatalogue })
        } catch (error) {
            errorToast('Unable fetch product catalogue')
            throw error;
        } finally {
            dispatchHomeState({ type: actionConstants.loaderComponent.loaded }) //remove loading animation
        }
    };
    
    //render each category as a button
    return (
        <div className="grid grid-rows-auto gap-4 overflow-y-auto h-96"> { /* set a scrollable height */}
            {categories.map((category) => (
                <SecondaryButton
                    key={category.name + uuid()} //to create a unique key for optimal element rendering
                    onClick={() => fetchProductCatalogue(category)}
                    buttonName={category.name}
                />
            ))} 
        </div>
    )
}