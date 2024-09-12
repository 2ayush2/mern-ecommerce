import axios from "axios";
import { useContext } from 'react';
import { UserContext } from "../../context/userContext";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get('/api/admin');
                setData(response.data);
                setLoading(false); // Data has been loaded
            } catch (err) {
                setError(err);
                setLoading(false); // Data loading failed
            }
        };

        fetchAdmin();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;
    if (!data) return <h1>No data available</h1>;

    return (
        <div>
        <h1>{data.message} hfoijoidsjoj</h1>
        <h1>{user} </h1>

        </div>
    );
};

export default AdminDashboard;
