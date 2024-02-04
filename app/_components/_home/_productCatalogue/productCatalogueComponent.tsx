import { Action } from "@/app/_models/_common/action";
import { Dispatch, FunctionComponent } from "react";
import { actionConstants, dialogActionConstants } from "../../../_actions/_home/homeActionConstants";
import { Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { CustomizedButton } from "../../_common/_buttons/buttons";

interface ProductCatalogueComponentProps {
    productCatalogue: Product[];
    dispatchHomeState: Dispatch<Action>;
    dispatchDialogState: Dispatch<Action>;
}

export const ProductCatalogueComponent: FunctionComponent<ProductCatalogueComponentProps> = ({ productCatalogue, dispatchHomeState, dispatchDialogState }) => {
    const loadAddProductDialog = (product: Product) => {
        dispatchDialogState({ type: dialogActionConstants.open.addProductDialog }) //open up AddProductDialog
        dispatchHomeState({ type: actionConstants.productCatalogueComponent.setAddProduct, payload: product}) //set addProduct to selected product in the product catalogue
                       
    }
    
    //render each product in productCatalogue as a card
    return (
        <div>
            {productCatalogue && <div className="grid grid-cols-4 grid-rows-4 overflow-y-auto h-96"> { /* to scrollable height */}
                {productCatalogue!.map((product, index) => (
                    <div 
                        className="p-1"
                        key={ product.name + product.id + index + randomUUID } //to create a unique key for optimal element rendering
                    >
                        <CustomizedButton 
                            className="h-full w-full bg-green-500 hover:bg-green-700 text-gray-50 border border-black font-bold rounded" 
                            onClick={() => loadAddProductDialog(product)}
                            buttonName={product.name}
                        />
                    </div>

                ))} 
            </div>}
            {!productCatalogue && <div>Click on any buttons under <b>Category</b> to view product catalogue</div>}
        </div>
    )
}