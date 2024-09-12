import { useState,useContext } from "react";
import axios from "axios";
import {  Link,useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Login() {
    const {setUser}=useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email,password}=data;

    try{
        const {data:UserData}=await axios.post('/api/login',{
            email,password
        })
        console.log(UserData.data);
        setUser(UserData)
        navigate('/');


    }
    catch  (error){
        console.error('Thie following is the error')

    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          >
            Login
          </button>
          <div className="text-sm text-center text-gray-600">
            Not a member?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
            <br />
            <Link to="/forgetpassword" className="text-indigo-600 hover:underline">
              Forget password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
