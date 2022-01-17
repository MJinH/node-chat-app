import {useEffect, useReducer, createContext} from "react"
import AuthReducer from "./AuthReducer"


const USER_STORAGE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    error:false
}


export const AuthContext = createContext(USER_STORAGE)

export const AuthContextProvider  = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,USER_STORAGE)
    useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}