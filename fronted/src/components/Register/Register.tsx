import { useEffect, useState } from "react"
import useFetch from "../../Hooks/useFetch"
import type { AuthResponse } from "../../types/types"
import { useNavigate } from "react-router"
import { useAuthStore } from "../../store/authStore"
import "./Register.css"

const url = "http://localhost:3000/auth/register"
export default function Register() {
    const { execute, data } = useFetch<AuthResponse>(url)
    const { setAuth } = useAuthStore()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handelUseFetch = async () => {
        await execute({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
    }
    if (data && data.success === false) {
        return (<><h1>{data.message}</h1></>)
    }
    useEffect(() => {
        if (data && data.success === true && data.data) {
            console.log(data);
            setAuth(data.data?.token, data.data)
            navigate("/")
        }
    }, [url, data])
    return (
        <div className="register">
            <h1 className="sign-up">Sign-up</h1>
            <input className="email-input" type="text" placeholder="enter email..." value={email} onChange={e => setEmail(e.target.value)} />
            <input className="password-input" type="text" placeholder="enter password..." value={password} onChange={e => setPassword(e.target.value)} />
            <button className="button-register" onClick={handelUseFetch}>Sign-up</button>
        </div>
    )
}
