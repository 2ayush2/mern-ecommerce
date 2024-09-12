import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Forgetpassword() {
  const [data, setData] = useState({
    email: "",
  });
  const [message, setMessage] = useState(""); // For success or error messages
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = data;

    try {
      const response = await axios.post("/api/forgetpassword", {
        email,
      });
      console.log(response)

      // Display success message to the user
      setMessage("Password reset link has been sent to your email.");
      setError(""); // Clear any previous error messages

      // Redirect to login or home page after a few seconds if needed
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // Handle errors
      console.error("Error sending reset link:", error);
      setError("There was a problem sending the reset link. Please try again.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>
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

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
          >
            Send Reset Link
          </button>

          {/* Display success or error messages */}
          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-sm text-center text-gray-600">
            Not a member?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
