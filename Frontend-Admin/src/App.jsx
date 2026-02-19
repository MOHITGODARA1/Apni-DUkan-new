import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Delivery from "./pages/Delivery";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <div className="bg-[#0a0e1a] min-h-screen text-white">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="orders" element={<Orders />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="customers" element={<Customers />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
