import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the user data
        const response = await axios.get('/api/user');
        console.log(response)
        setData(response.data);  // response.data contains the actual data
      } catch (error) {
        setError("An error occurred while fetching the data.");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Add a fallback while loading data
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>{data.message}mfkdsmlafmlsdm</div>
  );
};

export default UserDashboard;
