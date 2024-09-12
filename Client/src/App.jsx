import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/login";
import Header from "./components/Header";
import HomepageScreen from "./screens/HomepageScreen";
import InnerPage from "./screens/InnerPage";

import UserContextProvider from "./context/userContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/protectedRoute";
import ProductContextProvider from "./context/productContext";
import UserDashboard from "./pages/user/userDashboard";
import Forgetpassword from "./pages/Auth/forgetPassword";
import ResetPassword from "./pages/Auth/resetPassword";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <ProductContextProvider>
          <Header />
          <Routes>
            <Route 
              path="/" 
              element={<HomepageScreen />} 
            />
            <Route path="/product/:id" element={<InnerPage />} />
           
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/user" element={<ProtectedRoute> <UserDashboard/>  </ProtectedRoute> } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
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
        </ProductContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
