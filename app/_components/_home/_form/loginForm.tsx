import { actionConstants } from "@/app/_actions/_home/homeActionConstants";
import { Action } from "@/app/_models/_common/action";
import { EmployeeDetails } from "@/app/_models/_home/employeeDetails";
import { Dispatch, FunctionComponent, useState, ChangeEvent } from "react";
import { CustomizedButton } from "../../_common/_buttons/buttons";
import { successToast, errorToast, infoToast } from "../../_common/_toast/toast";
import Image from 'next/image'


interface LoginFormProps {
    dispatchHomeState: Dispatch<Action>;
    employeeDetails?: EmployeeDetails;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ dispatchHomeState }) => {
    const [tempEmployeeId, setTempEmployeeId] = useState<number | string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        //parse and set input value only if input value is not empty. Resets state variable back to empty string if input field is cleared
        //this means that tempEmployee can only be a postive number (greater than 0) or a empty string
        if (event.target.value && parseInt(event.target.value) > 0) {
            setTempEmployeeId(parseInt(event.target.value));
        } else {
            infoToast("Employee id must be a positive number");
            setTempEmployeeId("")
        }
    }

    const fetchData = async (): Promise<EmployeeDetails> => {
        try {
            dispatchHomeState({ type: actionConstants.loaderComponent.loading }) //start loading animation
            const response = await fetch(`/api/login/${tempEmployeeId}`); // Fetch data from your API route
            const employeeDetails: EmployeeDetails = await response.json(); // Extract JSON data from the response
            if (response.status === 500) {//capture error if response is 500
                throw new Error("Unable find employee with such id");
            }
            successToast("Successfully logged in as " + employeeDetails.name)
            return employeeDetails;
        } catch (error) {
            errorToast('Error occurred while logging in')
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            dispatchHomeState({ type: actionConstants.loaderComponent.loaded }) //remove loading animation
        }
    };

    const handleLogin = async () => {//update value and close dialog
        if (tempEmployeeId === "") {
            errorToast("Please input a valid employee id")
        } else {
            try {
                //fetch data from backend
                const employeeDetails: EmployeeDetails = await fetchData();
                dispatchHomeState({ type: actionConstants.authentication.login, payload: employeeDetails});
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    }
    
    return (
        <div 
            className="relative w-auto mx-auto my-6 max-w-60 w-60 md:max-w-96 md:w-96" //responsive layout - design mobile first 
        >
            <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg">
                <div className="grid grid-rows-3 gap-4">
                    <div className="p-4">
                        <div className="flex flex-col items-center justify-between rounded-t gap-5">
                            <p className="text-2xl font-semibold">POS-RAiD System</p>
                            <Image src="/logo.png" width={50} height={50} alt="Logo" />
                            <p className="text-lg font-semibold">Please login to continue</p>
                        </div>
                    </div>
                    <div className="p-4">
                        <input
                            type="number"
                            value={tempEmployeeId}
                            onChange={handleInputChange}
                            placeholder="Enter employee id.."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-around p-4">
                        <CustomizedButton 
                            onClick={handleLogin} 
                            buttonName={"Login"}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-2 px-4 rounded mb-4"
                            style={{height: 'fit-content'}}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    )
}