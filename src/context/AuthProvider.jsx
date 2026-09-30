import { createContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseURL";

/* eslint-disable react-refresh/only-export-components */

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [author, setAuthor] = useState(null);
    const accessToken = localStorage.getItem('lm-token')
    const [loading, setLoading] = useState(() => Boolean(accessToken))

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const fetchUser = async () => {
            const resUser = await fetch(`${baseurl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .finally(()=> setLoading(false));
            
            const userData = await resUser.json();
            setAuthor(userData);
            console.log(resUser);
        };

        fetchUser()
    }, [accessToken])

    // console.log(author);

    const logout = () => {
        localStorage.removeItem('lm-token');
        setAuthor(null);
    }

    return (
        <div>
            <AuthContext.Provider value={{ author, setAuthor, logout, accessToken,loading }}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
