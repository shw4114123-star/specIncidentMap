import { Route, Routes } from "react-router"
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"
import Map from "./pages/MapPage"
import Layout from "./Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Map />} />
        </Route>
      </Routes>
    </div>
  )
}
