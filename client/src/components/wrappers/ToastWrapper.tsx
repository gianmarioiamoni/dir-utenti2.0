"use client"

import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomToastProviderProps extends ToastContainerProps { }

export function ToastProvider(props: CustomToastProviderProps) {
    return <ToastContainer {...props} />;
}