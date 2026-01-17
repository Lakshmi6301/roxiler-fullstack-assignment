import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminDashboard from "./admin/AdminDashboard"
import UserStores from "./user/UserStores"
import OwnerDashboard from "./owner/OwnerDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserStores />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
