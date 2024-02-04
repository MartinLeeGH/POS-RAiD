import { Action } from "@/app/_models/_common/action";
import { ProductDTO } from "@/app/_models/_home/productDTO";
import { ChangeEvent, Dispatch, FunctionComponent, useEffect, useState } from "react";
import { actionConstants, dialogActionConstants } from "../../../_actions/_home/homeActionConstants";
import { errorToast, successToast, infoToast } from "../../_common/_toast/toast";
import { PrimaryButton, SecondaryButton } from "../../_common/_buttons/buttons";

interface QuantityDialogProps {
    isDialogOpen: boolean;
    dispatchDialogState: Dispatch<Action>;
    selectedProduct: ProductDTO;
    dispatchHomeState: Dispatch<Action>;
}

export const QuantityDialog: FunctionComponent<QuantityDialogProps> = ({isDialogOpen, dispatchDialogState, selectedProduct, dispatchHomeState}) => {
    const [tempQuantity, setTempQuantity] = useState<number | string>(selectedProduct?.quantity ? selectedProduct?.quantity: "");

    useEffect(() => {//reset dialog to its initial state whenever dialog is opened or closed
        setTempQuantity(selectedProduct?.quantity ? selectedProduct?.quantity: ""); //reset variable to empty string
    }, [isDialogOpen])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        //parse and set input value only if input value is not empty. Resets state variable back to empty string if input field is cleared
        //this means that tempQuantity can only be a postive number (greater than 0) or a empty string
        if (event.target.value && parseInt(event.target.value) > 0) {
            setTempQuantity(parseInt(event.target.value));
        } else {
            infoToast("Quantity must be a positive number");
            setTempQuantity("")
        }
    }

    const updateValue = () => {//update value and close dialog
        //tempQuantity can only be a positive number (greater than 0) or a empty string
        if (tempQuantity === "") {
            errorToast("Please input a positive number")
        } else {
            dispatchHomeState({ type: actionConstants.quickActions.updateQuantity, payload: {...selectedProduct, quantity: tempQuantity}});
            dispatchDialogState({ type: dialogActionConstants.close.quantityDialog});
            successToast('Updated quantity for ' + selectedProduct.name);
        }
    }
    
    return (
        <div
        //styles :
            //fixed to fixate location of dialog regardless if user scrolls
            //inset-0 to make width and height of dialog to that of parent element
            //z-50 positions dialog to the front of all element
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ${
            isDialogOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        >
            {selectedProduct && <div className="relative w-auto max-w-md mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg">
                    <div className="grid grid-rows-3 gap-4">
                        <div className="p-4">
                            <div className="flex flex-col items-start justify-between border-b border-solid rounded-t">
                                <h3 className="text-lg font-semibold">Update Product Quantity</h3>
                                <h5>{selectedProduct.name} [productId : {selectedProduct.id}]</h5>
                            </div>
                        </div>
                        <div className="p-4">
                            <label>Updated quantity</label>
                            <input
                            type="number"
                            value={tempQuantity}
                            onChange={handleInputChange}
                            placeholder="Enter quantity.."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-around p-4">
                            <PrimaryButton onClick={updateValue} buttonName={"Update"} />
                            <SecondaryButton onClick={() => dispatchDialogState({type: dialogActionConstants.close.quantityDialog})} buttonName={"Cancel"}/>
                        </div>
                    </div>
                   
                </div>
            </div>}
        </div>
    )
}