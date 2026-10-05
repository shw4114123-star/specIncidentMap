import { useAuthStore } from "../store/authStore"
import "../App.css"

export default function MapPage() {
    const { user } = useAuthStore()
    return (
        <div className="user">
            <h3 className="h3">id : {user?._id}</h3>
            <h4 className="h4">email : {user?.email}</h4>
            <h5 className="h5"> createAt: {user?.createAt}</h5>
        </div>
    )
}
