import { IoSearchSharp } from "react-icons/io5";




export default function SearchInput() {
  return (
    <form className="flex items-center gap-2 pt-2">
        <input className="input input-bordered rounded-full" type="text" placeholder="Search..." />
        <button className="btn btn-circle text-white bg-sky-500 hover:bg-gray-800" type="submit">
            <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
    </form>
  )
}
