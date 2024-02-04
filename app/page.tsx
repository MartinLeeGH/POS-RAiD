'use client' //converts this component and its child components to client side rendering
import { Category } from "@prisma/client";
import { useEffect, useReducer } from "react";
import { actionConstants, dialogActionConstants } from "./_actions/_home/homeActionConstants";
import { PrimaryButton } from "./_components/_common/_buttons/buttons";
import { Loader } from "./_components/_common/_loader/loader";
import { errorToast, successToast } from "./_components/_common/_toast/toast";
import { CategoryMenuComponent } from "./_components/_home/_categoryMenu/categoryMenuComponent";
import { AddProductDialog } from "./_components/_home/_dialog/addProductDialog";
import { CheckoutDialog } from "./_components/_home/_dialog/checkOutDialog";
import { QuantityDialog } from "./_components/_home/_dialog/quantityDialog";
import { ProductCatalogueComponent } from "./_components/_home/_productCatalogue/productCatalogueComponent";
import { QuickActionsComponent } from "./_components/_home/_quickActions/quickActionsComponent";
import { ProductComponent } from "./_components/_home/_summary/productComponent";
import { HomeState, HomeDialogState } from "./_models/_home/homeState";
import { ProductDTO } from "./_models/_home/productDTO";
import { HomeDialogReducer } from "./_reducer/_home/_homeDialogReducer";
import { HomeStateReducer } from "./_reducer/_home/_homeStateReducer";
import { moneyFormatter } from "./_utils/formatter";
import { LoginForm } from "./_components/_home/_form/loginForm";

export default function Home() {
  const data: Array<ProductDTO> = [
    { id: 1, name: "Royal Gaia Apple", price: 1.0, quantity: 2},
    { id: 4, name: "Tangerine", price: 0.6, quantity: 7},
    { id: 8, name: "Chicken Drumstick", price: 2.5, quantity: 3},
  ];

  const initialTotalCost: number = data.map(product => product.quantity*product.price).reduce((product1, product2) => product1 + product2, 0)//use map function to get total price of each product, and then sum up the total cost with reduce function
        
  const initialHomeState: HomeState = {
    products: [...data],
    totalCost: initialTotalCost,
    isLoading: false
    // employeeDetails: employeeDetails
  }

  const initialHomeDialogState: HomeDialogState = {
    isQuantityDialogOpened: false,
    isCheckoutDialogOpened: false,
    isAddProductDialogOpened: false
  }

  //chose reducer to manage states of multiple dialogs such as quantity dialog or authenticaiton dialog
  const [homeDialogState, dispatchDialogState] = useReducer(HomeDialogReducer, initialHomeDialogState);

  //chose reducer to manage multiple states instead of creating many useStates
  const [homeState, dispatchHomeState] = useReducer(HomeStateReducer, initialHomeState);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch(`/api/category`); // Fetch data from your API route
            const categories: Category[] = await response.json(); // Extract JSON data from the response
            if (response.status === 500) {//capture error if response is 500
                throw new Error("Unable fetch categories");
            }
            dispatchHomeState( { type: actionConstants.categoryMenuComponent.load, payload: categories}) //dispatch and set categories data into homestate
        } catch (error) {
            errorToast('Unable fetch categories')
            throw error;
        }
    };
    fetchCategories();
}, [])//fetch list of categories from database only once when this component is initialized

  useEffect(() => {
  }, [homeState.employeeDetails])

  useEffect(() => {//tracks final cost of products when the quanitity of the products are updated or removed
    dispatchHomeState({type: actionConstants.productComponent.updateBill})
  }, [homeState.products])
  
  return (
    <main className="p-4 md:p-24">
      {/* shows menu and buttons only if employee is logged in*/}
      {homeState.employeeDetails && <div className="min-w-96"> {/* sets a minimum of 24rem for display on small devices*/}
        <div className="flex justify-between p-1">
          <div>Welcome, {homeState.employeeDetails.name}[{homeState.employeeDetails.employeeId}]</div>
          <div className="self-end">
            {/* shows logout button if user is logged in*/}
            <PrimaryButton
              onClick={() => {
                dispatchHomeState({ type: actionConstants.authentication.logout});
                successToast('Successfully logged out')
              }}
              buttonName="logout"
            />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 lg:grid-cols-12">
          <div className="col-span-4 p-2 border border-gray-400 overflow-x-scroll lg:col-span-4"><ProductComponent products={homeState.products} dispatchHomeState={dispatchHomeState}/></div>
          <div className="col-span-2 p-2 border border-gray-400 overflow-hidden lg:col-span-2"><QuickActionsComponent selectedProduct={homeState.selectedProduct!} dispatchHomeState={dispatchHomeState} dispatchDialogState={dispatchDialogState}/></div>
          <div className="col-span-2 p-2 border border-gray-400 lg:col-span-2"><CategoryMenuComponent categories={homeState.categories!} dispatchHomeState={dispatchHomeState}/></div>
          <div className="col-span-4 p-2 border border-gray-400 lg:col-span-4"><ProductCatalogueComponent productCatalogue={homeState.productCatalogue!} dispatchHomeState={dispatchHomeState} dispatchDialogState={dispatchDialogState}/></div>
        </div>
        <QuantityDialog isDialogOpen={homeDialogState.isQuantityDialogOpened} dispatchDialogState={dispatchDialogState} selectedProduct={homeState.selectedProduct!} dispatchHomeState={dispatchHomeState}/>
        <CheckoutDialog isDialogOpen={homeDialogState.isCheckoutDialogOpened} dispatchDialogState={dispatchDialogState} dispatchHomeState={dispatchHomeState} totalCost={homeState.totalCost!} products={homeState.products} employeeDetails={homeState.employeeDetails!}/>
        <AddProductDialog isDialogOpen={homeDialogState.isAddProductDialogOpened} dispatchDialogState={dispatchDialogState} dispatchHomeState={dispatchHomeState} addProduct={homeState.addProduct!}/>
        <div className="flex justify-between items-center p-1">
          <div className="align-end">
            <p>Subtotal (less 6% GST) : ${moneyFormatter(homeState.totalCost!*0.94)}</p>
            <p>Tax rate (6% GST) : ${moneyFormatter(homeState.totalCost!*0.06)}</p>
            <p>Total : ${moneyFormatter(homeState.totalCost!)}</p>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatchDialogState({ type: dialogActionConstants.open.checkoutDialog})}>Checkout</button>
        </div>
      </div>}
      {/* shows the please login form if employee is not logged in */}
      {!homeState.employeeDetails && <LoginForm dispatchHomeState={dispatchHomeState} />}
      {/* loader animation */}
      {homeState.isLoading && <Loader/>}
    </main>
  );
}