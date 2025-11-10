import Message from './Message'
import { useGetMessages } from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect, useRef } from 'react'
import useListenMessages from '../../hooks/useListenMessages'

export default function Messages() {

  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map(mess => (
        <div key={mess._id}  ref={lastMessageRef}>
          <Message message={mess} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Start the conversation</p>
      )}
    </div>
  )
}
