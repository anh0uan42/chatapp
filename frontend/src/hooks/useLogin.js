import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { BiFemaleSign } from "react-icons/bi"




export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputError(username, password)
        if (!success) return;
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username, password})
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

const handleInputError = (username, password) => {
    if (!username || !password) {
        toast.error('Missing password or username')
        return false
    }
    return true
}