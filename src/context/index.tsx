import {AuthProvider} from "./authContext";
import React, {ReactNode} from "react"

export const AppProvider = ({children}:{children:ReactNode}) => {
    return (
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}
export default AppProvider;
