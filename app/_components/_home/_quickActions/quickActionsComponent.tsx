import { Action } from "@/app/_models/_common/action";
import { ProductDTO } from "@/app/_models/_home/productDTO";
import { Dispatch, FunctionComponent } from "react";
import { actionConstants, dialogActionConstants } from "../../../_actions/_home/homeActionConstants";
import { errorToast, successToast } from "../../_common/_toast/toast";
import { CustomizedButton } from "../../_common/_buttons/buttons";

interface QuickActionsComponentProps {
    selectedProduct: ProductDTO;
    dispatchHomeState: Dispatch<Action>;
    dispatchDialogState: Dispatch<Action>;
}

export const QuickActionsComponent: FunctionComponent<QuickActionsComponentProps> = ({selectedProduct, dispatchHomeState, dispatchDialogState}) => {
    const customizedButtonClassNames = {
        successButtonFullWidth: "w-full bg-green-500 hover:bg-green-700 text-gray-50 font-bold py-2 px-4 border border-black rounded mb-4",
        dangerButtonFullWidth: "w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-black rounded mb-4"
    }  
    const handleDispatch = (dispatch: Dispatch<Action>, action: Action, successToastMsg?: String) => {
        if (!selectedProduct) {
            errorToast("Select an item in the summary list first")
        } else {
            dispatch(action); //dispatch function (dispatchHomeState, dispatchDialogState), as well as its action are passed in through the button click function
            if (successToastMsg) {
                successToast(successToastMsg);//create success toast message if successToastMsg is present?
            } 
        }
    }
    return (
        <div className="overflow-y-auto overflow-x-hidden max-w-full h-96"> { /* to scrollable height */}
            <CustomizedButton 
                className={customizedButtonClassNames.successButtonFullWidth} 
                style={!selectedProduct ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                onClick={() => handleDispatch(dispatchHomeState, { type: actionConstants.quickActions.updateQuantity, payload: {...selectedProduct, quantity: selectedProduct?.quantity +1}})}
                buttonName="+1"
            />
            <CustomizedButton 
                className={customizedButtonClassNames.successButtonFullWidth} 
                style={!selectedProduct ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                onClick={() => handleDispatch(dispatchDialogState, ({ type: dialogActionConstants.open.quantityDialog }))}
                buttonName="Quantity"
            />
            <CustomizedButton 
                className={customizedButtonClassNames.successButtonFullWidth} 
                style={!selectedProduct ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                onClick={() => handleDispatch(dispatchHomeState, ({ type: actionConstants.quickActions.updateQuantity, payload: {...selectedProduct, quantity: selectedProduct?.quantity -1}}))}
                buttonName="-1"
            />
            <CustomizedButton 
                className={customizedButtonClassNames.dangerButtonFullWidth}
                style={!selectedProduct ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                onClick={() => {
                    const successToastMsg: String = "Voided [" + selectedProduct?.name + "]";
                    handleDispatch(dispatchHomeState, ({ type: actionConstants.quickActions.void, payload: selectedProduct}), successToastMsg)
                }}
                buttonName="void"
            />
            <CustomizedButton 
                className={customizedButtonClassNames.dangerButtonFullWidth}
                onClick={() =>  {//clear button does not require item to be selected. Thus can be dispatch directly instead of through the custom handleDispatch function
                    dispatchHomeState({ type: actionConstants.quickActions.clear})
                    successToast("Cleared cart")}
                }
                buttonName="clear"
            />
        </div>
    )
}