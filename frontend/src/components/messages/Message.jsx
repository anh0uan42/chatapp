




export default function Message() {
  return (
    <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src="https://as2.ftcdn.net/jpg/02/44/43/69/1000_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg" alt="Tailwind css chat bubble component" />
            </div>
        </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1">12:42</div>
    </div>
  )
}
