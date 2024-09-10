import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS


import { useState } from "react";

function Register() {
  const [data, setData] = useState({
    username: '',
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email } = data;

    try {
      const fetchRegister = await axios.post('/api/register', {
        username, email, password
      });
      console.log(fetchRegister.data);
      toast.success("You have successfully registered!"); // Show success message
      navigate('/')
    } catch (error) {
      console.error("Error registering the data", error);
      toast.error("Failed to register!");  // Show error message
    }
  };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label className="block mb-1 text-gray-600" htmlFor="email">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        >
          Register
        </button>
        <div className="text-sm text-center text-gray-600">
          Not a member?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  </div>   

)
}

export default Register