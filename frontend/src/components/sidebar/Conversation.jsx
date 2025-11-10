import { useSocketContext } from "../../context/SocketContext"
import useConversation from "../../zustand/useConversation"


export default function Conversation({ emoji, convo, lastIdx }) {

  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === convo._id

  const { onlineUsers } = useSocketContext()
  console.log(onlineUsers)
  const isOnline = onlineUsers.includes(convo._id)


  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-sky-500' : ''}`}
        onClick={() => setSelectedConversation(convo)}
      >
        <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
          <div className="w-12 rounded-full">
            <img alt="user avatar" src={convo.profilePic}/>
          </div>
        </div>
        <div className="flex-col flex flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{convo.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 p-0 h-1" />}
    </>
  )
}
