import { ProductDTO } from "../../../_models/_home/productDTO"
import { Dispatch, FunctionComponent, useEffect, useState } from "react"
import { moneyFormatter } from "../../../_utils/formatter"
import { ProductComponentItem } from "./productComponentItem"
import { ProductComponentHeader } from "./productComponentHeader"
import { Action } from "@/app/_models/_common/action"
import { actionConstants } from "../../../_actions/_home/homeActionConstants"

interface ProductComponentProps {
    products: Array<ProductDTO>;
    dispatchHomeState: Dispatch<Action>;
}

export const ProductComponent: FunctionComponent<ProductComponentProps> = ({products, dispatchHomeState}) => {
    return (
        <div className="overflow-y-auto h-96 min-w-96 w-full"> { /* to scrollable height */}
            <ProductComponentHeader/>
            {
                products.map((product) => (
                    <div 
                        className="grid grid-cols-4 border-b border-gray-500" 
                        onClick={() => dispatchHomeState({ type: actionConstants.productComponent.select, payload: product.id})}
                        style={{
                            backgroundColor: product.isSelected ? 'grey' : 'white',
                            cursor: 'pointer'
                        }}
                        key={product.id}
                    >
                        <div><ProductComponentItem text={product.name}/></div>
                        <div><ProductComponentItem text={moneyFormatter(product.price)}/></div>
                        <div><ProductComponentItem text={product.quantity}/></div>
                        <div><ProductComponentItem text={moneyFormatter(product.price * product.quantity)}/></div>
                    </div>
                ))
            }
        </div>
    )
}