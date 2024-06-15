import { Children, useContext } from "react";
import React from "react";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage : ToastMessage) => void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined); // created a context with default value "undefined"

export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return(
        <AppContext.Provider value={{
            showToast: ()=> undefined,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}