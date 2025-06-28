import {createContext, useState, useEffect, useContext} from "react";
import axios from "../axios/axios";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const stored = localStorage.getItem("tokens");
        return stored ? JSON.parse(stored) : null;
    });

    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("tokens");
            return stored ? jwtDecode(JSON.parse(stored).access) : null;
        } catch {
            return null;
        }
    });

    const login = async (username, password) => {
        try {
            const response = await axios.post("/token/", {username, password});
            const data = response.data;

            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("tokens", JSON.stringify(data));
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("tokens");
    };

    // Optional: sync state with localStorage on refresh
    useEffect(() => {
        if (authTokens) {
            try {
                setUser(jwtDecode(authTokens.access));
            } catch {
                logout();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, authTokens, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;