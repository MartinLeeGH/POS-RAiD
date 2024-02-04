import { Category, Product } from "@prisma/client"
import { EmployeeDetails } from "./employeeDetails"
import { ProductDTO } from "./productDTO"

export interface HomeState {
    products: Array<ProductDTO>,
    selectedProduct?: ProductDTO, //when updating product that is already in the cart
    employeeDetails?: EmployeeDetails,
    totalCost?: number
    categories?: Array<Category>, //list of categories that staff can choose from
    productCatalogue?: Array<Product> //products in a specific category
    addProduct?: ProductDTO //when adding new product from product catalogue
    isLoading?: boolean //set to true when waiting for api results 
}
  
export interface HomeDialogState {
    isQuantityDialogOpened: boolean,
    isCheckoutDialogOpened: boolean,
    isAddProductDialogOpened: boolean
}