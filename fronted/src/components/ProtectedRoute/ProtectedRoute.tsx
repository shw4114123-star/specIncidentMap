import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../store/authStore"


export default function ProtectedRoute() {
    const { token } = useAuthStore()
    if (!token) return (<Navigate to={"/login"}/>)
    return (
        <div>
            <Outlet />
        </div>
    )
}
