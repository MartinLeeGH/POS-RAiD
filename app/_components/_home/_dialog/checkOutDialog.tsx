import { Action } from "@/app/_models/_common/action";
import { ProductDTO } from "@/app/_models/_home/productDTO";
import { ChangeEvent, Dispatch, FunctionComponent, useEffect, useState } from "react";
import { actionConstants, dialogActionConstants } from "../../../_actions/_home/homeActionConstants";
import { EmployeeDetails } from "@/app/_models/_home/employeeDetails";
import { errorToast, successToast } from "../../_common/_toast/toast";
import { PrimaryButton, SecondaryButton } from "../../_common/_buttons/buttons";

interface CheckOutDialogProps {
    isDialogOpen: boolean;
    dispatchDialogState: Dispatch<Action>;
    dispatchHomeState: Dispatch<Action>;
    totalCost: number; 
    products: ProductDTO[];
    employeeDetails: EmployeeDetails;
}

interface PaymentRequestDTO {
    employeeDetails: EmployeeDetails;
    totalCost: number; 
    products: ProductDTO[];
}

export const CheckoutDialog: FunctionComponent<CheckOutDialogProps> = ({isDialogOpen, dispatchDialogState, dispatchHomeState, totalCost, products, employeeDetails}) => {
    const paymentRequestDTO: PaymentRequestDTO = {
        employeeDetails: employeeDetails,
        totalCost: totalCost,
        products: products
    }

    const fetchData = async (): Promise<EmployeeDetails> => {
        try {
            dispatchHomeState({ type: actionConstants.loaderComponent.loading }) //start loading animation
            const response = await fetch(`/api/payment`, {
                method: 'POST', //to add request body
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: paymentRequestDTO})
            }); // tabulate and save transaction to database
            const jsonData: EmployeeDetails = await response.json(); // Extract JSON data from the response
            if (response.status === 500) {//capture error if response is 500
                throw new Error("Unable find employee with such id");
            }
            successToast('Successfully completed the payment transaction')
            return jsonData;
        } catch (error) {
            errorToast('Error encountered while processing payment. Please try again later')
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            dispatchHomeState({ type: actionConstants.loaderComponent.loaded }) //remove loading animation
        }
    };

    const handlePayment = async () => {//update value and close dialog
        if (products.length === 0) {//only allow transaction to be processed if there are items in the cart
            errorToast('Cart is empty. Add products to cart');
        } else {
            try {
                //save transaction to database
                const employeeDetails: EmployeeDetails = await fetchData();
                //clear items in homestate to prepare for next customer
                dispatchHomeState({ type: actionConstants.quickActions.clear });
                dispatchHomeState({ type: actionConstants.loaderComponent.loaded }) //stop loading animation
                //close payment dialog
                dispatchDialogState({ type: dialogActionConstants.close.checkoutDialog});
            } catch (error) {
                //do not clear products in basket until payment succeeded as customer might retry other payment methods
                console.error('Error fetching data:', error);
                throw error;
            }
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
            <div className="relative w-auto max-w-md mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg">
                    <div className="grid grid-rows-3 gap-4">
                        <div className="p-4">
                            <div className="flex flex-col items-start justify-between border-b border-solid rounded-t">
                                <h3 className="text-lg font-semibold">Confirm purchase?</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <label>Total bill : {"$" + totalCost as string}</label>
                        </div>
                        <div className="flex justify-around p-4">
                            <PrimaryButton onClick={handlePayment} buttonName={"Checkout"} />
                            <SecondaryButton onClick={() => dispatchDialogState({type: dialogActionConstants.close.checkoutDialog})} buttonName={"Cancel"}/>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}