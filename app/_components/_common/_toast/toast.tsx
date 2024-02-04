'use-client'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerComponent() {
    return (<ToastContainer />)
}

export const successToast = (message: String) => {
    toast(message);
}

export const errorToast = (message: String) => {
    toast.error(message);
}

export const infoToast = (message: String) => {
    toast.info(message);
}