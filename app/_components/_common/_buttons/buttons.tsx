import { FunctionComponent } from "react";


interface ButtonProps {
    buttonName: string;
    onClick: () => void; // Adjust the type of onClick function as per your requirement
    style?: React.CSSProperties; // Style prop to accept CSS properties
    className? : string; // custom class name (tailwindcss)
}

//for actions - submit, save, confirm
export const PrimaryButton: FunctionComponent<ButtonProps> = ({ buttonName, onClick, style }) => {
    return (
        <button 
            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} 
            onClick={onClick}
            style={style ? style : undefined}
        >{buttonName}</button>
    )
}

//for actions - cancel, dismiss, info
export const SecondaryButton: FunctionComponent<ButtonProps> = ({ buttonName, onClick, style }) => {
    return (
        <button 
            className=".bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-black rounded shadow" 
            onClick={onClick}
            style={style ? style : undefined}
        >{buttonName}</button>
    )
}

//for actions - cancel, dismiss
export const SuccessButton: FunctionComponent<ButtonProps> = ({ buttonName, onClick, style }) => {
    return (
        <button 
            className="bg-green-500 hover:bg-green-700 text-gray-50 font-bold py-2 px-4 rounded" 
            onClick={onClick}
            style={style ? style : undefined}
        >{buttonName}</button>
    )
}

//for customized tailwindcss buttons
export const CustomizedButton: FunctionComponent<ButtonProps> = ({ buttonName, onClick, style, className }) => {
    return (
        <button 
            className={className ? className : undefined}
            onClick={onClick}
            style={style ? style : undefined}
        >{buttonName}</button>
    )
}