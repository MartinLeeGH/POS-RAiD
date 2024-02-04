import { dialogActionConstants } from "@/app/_actions/_home/homeActionConstants"
import { Action } from "@/app/_models/_common/action"
import { HomeDialogState } from "@/app/_models/_home/homeState"

//maintain the states of different dialogs
export const HomeDialogReducer = (state: HomeDialogState, action: Action) : HomeDialogState => {
    switch (action.type) {
        case dialogActionConstants.open.quantityDialog:
            return {...state, isQuantityDialogOpened: true}
        case dialogActionConstants.close.quantityDialog:
            return {...state, isQuantityDialogOpened: false}
        case dialogActionConstants.open.checkoutDialog:
            return {...state, isCheckoutDialogOpened: true}
        case dialogActionConstants.close.checkoutDialog:
            return {...state, isCheckoutDialogOpened: false}
        case dialogActionConstants.open.addProductDialog:
            return {...state, isAddProductDialogOpened: true}
        case dialogActionConstants.close.addProductDialog:
            return {...state, isAddProductDialogOpened: false}
        default:
            return state;
    }
}