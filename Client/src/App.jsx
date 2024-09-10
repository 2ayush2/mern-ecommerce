import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/login";
import Header from "./components/Header";
import HomepageScreen from "./screens/HomepageScreen";
import InnerPage from "./screens/InnerPage";
import UserContextProvider from "./context/userContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { UserContext } from "./context/userContext";

function App() {
  const {user}=useContext(UserContext);
  return (
    <Router>
      <UserContextProvider>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<HomepageScreen />} 
        />
        <Route path="/product/:id" element={<InnerPage />} />
        <Route path='/admin' element={user&&user.role==='admin'? <AdminDashboard/>:<Navigate to='/login' /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Include the ToastContainer */}
      <ToastContainer 
        position="top-right"
        autoClose={3000} // Toast will close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </UserContextProvider>
    </Router>
  );
}

export default App;
