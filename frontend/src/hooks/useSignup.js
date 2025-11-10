import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"



const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullName, username, password, confirmPassword, gender })
        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
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
    return {signup, loading}
}


const handleInputError = ({fullName, username, password, confirmPassword, gender}) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields')
    return false
    }
    if (password !== confirmPassword) {
        toast.error('Password doesnt match')
        return false
    }
    if (password.length < 6){
        toast.error('Password must have at least 6 character')
        return false
    }
    return true
}

export default useSignup