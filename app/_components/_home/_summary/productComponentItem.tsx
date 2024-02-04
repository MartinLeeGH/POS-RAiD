'use client' //to make the product component item render on client side
import { useState } from "react"


interface ProductComponentItemProps {
    text: string | number;
}

export const ProductComponentItem: React.FunctionComponent<ProductComponentItemProps> = ({text}) => {
    return (
        <div>
            {text}
        </div>
    )
}
