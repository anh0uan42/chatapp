import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router";
import useSignup from "../../hooks/useSignup";



export default function Signup() {

  const [input, setInput] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const { loading, signup } = useSignup();

  const handleGenderCheckbox = (gender) => {
    setInput({...input, gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(input)

    setInput({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })
  }




  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              value={input.fullName}
              onChange={(e) => setInput({...input, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              value={input.username}
              onChange={(e) => setInput({...input, username: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({...input, password: e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) => setInput({...input, confirmPassword: e.target.value})}
            />
          </div>
          <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>

          <GenderCheckbox onCheckboxChange={handleGenderCheckbox} selectedGender={input.gender} />
          <div>
            <button className="btn btn-block btn-sm mt-2 border-slate-700" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
