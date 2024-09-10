import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []); // Empty dependency array means this runs only once on mount

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
