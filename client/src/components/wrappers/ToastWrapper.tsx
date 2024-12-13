"use client"

import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = (props: ToastContainerProps) => {
  const defaultProps: ToastContainerProps = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };

  // Merge delle props passate con quelle di default
  const mergedProps = { ...defaultProps, ...props };

  return <ToastContainer {...mergedProps} />;
};