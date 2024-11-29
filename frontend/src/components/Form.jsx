import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useState } from "react"
import "../styles/form.css"

export default function Form({ route, method }) {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

   

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post(route, {username:username, password:password} )
                    if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }else {
                navigate("/login")
            }

         }
        catch(error) {
            alert(error)
         }

        finally {
            setLoading(false)
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h1>{name} </h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name">
            </input>

            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password">
            </input>

            <button type="submit">{name} </button>

        </form>
    )
}