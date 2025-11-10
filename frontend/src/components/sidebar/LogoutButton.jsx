import { BiLogOut } from "react-icons/bi";
import { useLogout } from '../../hooks/useLogout'



export default function LogoutButton() {

  const { loading, logout } = useLogout()

  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className="w-6 h-6 cursor-pointer pb-2" onClick={logout}/>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
}
