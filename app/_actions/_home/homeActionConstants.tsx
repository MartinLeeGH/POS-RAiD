export const actionConstants = {
    authentication: {
        login: "LOGIN",
        logout: "LOGOUT"
    },
    productComponent: {
        select: "SELECT_PRODUCT_COMPONENT", //select a product in the list
        updateBill: "UPDATE_BILL_PRODUCT_COMPONENT" //update bill whenever new products are added to the basket or removed
    },
    quickActions: {
        updateQuantity: "UPDATE_QUANTITY", //decrement, increment or change quantity of product
        void: "VOID", //void a single product
        clear: "CLEAR" //clear entire list of product
    },
    categoryMenuComponent: {
        load: "LOAD_CATEGORY_MENU_COMPONENT" //load categories,
    },
    productCatalogueComponent: {
        load: "LOAD_PRODUCT_CATALOGUE_COMPONENT", //load product category according when user selects a category
        setAddProduct: "SET_ADD_PRODUCT_CATALOGUE_COMPONENT", //when user clicks on the product in product category
        putToCart: "PUT_TO_CARD_CATALOGUE_COMPONENT" //add product to card
    },
    loaderComponent: {
        loaded: "LOADED_LOADER_COMPONENT",
        loading: "LOADING_LOADER_COMPONENT"
    }
}

export const dialogActionConstants = {
    open: {
        quantityDialog: "OPEN_QUANTITY_DIALOG",
        checkoutDialog: "OPEN_CHECKOUT_DIALOG",
        addProductDialog: "OPEN_ADD_PRODUCT_DIALOG"
    },
    close: {
        quantityDialog: "CLOSE_QUANTITY_DIALOG",
        checkoutDialog: "CLOSE_CHECKOUT_DIALOG",
        addProductDialog: "CLOSE_ADD_PRODUCT_DIALOG"
    }
}