import {AuthProvider} from "./authContext";
import React, {ReactNode} from "react"
import {store} from "../store";
import {Provider} from "react-redux";
export const AppProvider = ({children}:{children:ReactNode}) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                { children }
            </AuthProvider>
        </Provider>
    )
}
export default AppProvider;
