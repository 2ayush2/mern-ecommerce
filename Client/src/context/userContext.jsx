import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(error);
                setUser(null);
            } finally {
                setLoading(false); // Indicate that loading is finished
            }
        };

        fetchUser();
    }, []); // Empty dependency array means this runs only once on mount


    return (
        <UserContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
