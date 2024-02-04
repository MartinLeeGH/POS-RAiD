import { actionConstants } from "@/app/_actions/_home/homeActionConstants";
import { Action } from "@/app/_models/_common/action";
import { EmployeeDetails } from "@/app/_models/_home/employeeDetails";
import { HomeState } from "@/app/_models/_home/homeState";
import { ProductDTO } from "@/app/_models/_home/productDTO";
import { moneyFormatter } from "@/app/_utils/formatter";
import { Category, Product } from "@prisma/client";

export const HomeStateReducer = (state : HomeState, action: Action) : HomeState => {
    switch (action.type) {
        case actionConstants.productComponent.select:
            const productId : number = action.payload;
            //set the new list to be the new state of the product list
            return {
                ...state, 
                //Ensure that only 1 element can be selected at any point of time
                //iterate through the product list and sets the isSelected value for the selected product to be true. The isSelected value of other product will be set to false.
                //the updated selected product and other products are copied into another new list
                products: state.products.map(
                    product => {
                    if (product.id === productId) {
                        return {...product, isSelected: true} 
                    } else {
                        return {...product, isSelected: false}
                    }
                    }
                ),
                selectedProduct: state.products.find(product => product.id === productId) //sets the selectedProduct
            }
        case actionConstants.productComponent.updateBill://update final bill
            const totalCost: number = state.products.map(product => product.quantity*product.price).reduce((product1, product2) => product1 + product2, 0)//use map function to get total price of each product, and then sum up the total cost with reduce function
            return {
                ...state,
                totalCost: parseFloat(moneyFormatter(totalCost)) //change totalCost to 2 decimal places
            }
        case actionConstants.quickActions.updateQuantity://increment, decrement, or modify selectedProduct quantity
            const updatedProduct: ProductDTO = action.payload;
            if (updatedProduct.quantity <= 0) {//void the selectedProduct if quantity is decremented to 0
                //unable to call dispatch within a dispatch call
                //this is the walk around that also works with typescript
                return [{type: actionConstants.quickActions.void, payload: updatedProduct}].reduce(HomeStateReducer, state) 
            }
            return {
                ...state,
                products: state.products.map(product => product.id === updatedProduct.id ? {...product, quantity: updatedProduct.quantity} : product),
                selectedProduct: {...state.selectedProduct!, quantity: updatedProduct.quantity} //sets the selectedProduct with the updated quantity
            }
        case actionConstants.quickActions.void://void selectedProduct
            const voidedProduct: ProductDTO = action.payload;
            return {
                ...state,
                products: state.products.filter(product => product.id !== voidedProduct.id), //removes voided product
                selectedProduct: undefined // sets selectedProduct to undefined
            }
        case actionConstants.quickActions.clear://clears entire list
            return {
                ...state,
                products: [], //clears entire list
                selectedProduct: undefined // sets selectedProduct to undefined
            }
        case actionConstants.authentication.login:
            const employeeDetails: EmployeeDetails = action.payload!;
            return {
                ...state,
                employeeDetails: employeeDetails
            }
        case actionConstants.authentication.logout:
            return {
                ...state,
                employeeDetails: undefined
            }
        case actionConstants.categoryMenuComponent.load:
            const categories: Category[] = action.payload!;
            return {
                ...state,
                categories: categories
            }
        case actionConstants.productCatalogueComponent.load:
            const productCatalogue: Product[] = action.payload!;
            return {
                ...state,
                productCatalogue: productCatalogue
            }
        case actionConstants.productCatalogueComponent.setAddProduct:
            const addProduct: Product = action.payload!;
            const addProductDTO: ProductDTO = {// map product to productDTO
                id: addProduct.id,
                name: addProduct.name,
                quantity: 1, //quantity is defaulted to 1
                price: addProduct.price,
                isSelected: false
            }
            return {
                ...state,
                addProduct: addProductDTO
            }
        case actionConstants.productCatalogueComponent.putToCart:
            const cartProductDTO: ProductDTO = action.payload!;
            const productsInCart: ProductDTO[] = [...state.products, cartProductDTO]; //adds cart item into cart
            //after adding to list, group the products together and sum quantity
            let finalProducts : { [id: number]: ProductDTO } = {}
            productsInCart.forEach((product) => {
                if (!finalProducts[product.id]) { //if product does not exist in list yet 
                    finalProducts[product.id] = product;
                } else { //if product already exist in list
                    finalProducts[product.id] = {...finalProducts[product.id], quantity: finalProducts[product.id].quantity + product.quantity}

                }
            })

            return {
                ...state,
                products: Object.values(finalProducts)
            }
        case actionConstants.loaderComponent.loaded:
            return {
                ...state,
                isLoading: false
            }
        case actionConstants.loaderComponent.loading:
            return {
                ...state,
                isLoading: true
            }
        default:
            //return state as it is if no cases matches
            return state;
    }
}