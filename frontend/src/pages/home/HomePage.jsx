import MessageContainer from "../../components/messages/MessageContainer";
import SideBar from "../../components/sidebar/SideBar";


export default function HomePage() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <SideBar />
      <MessageContainer />
    </div>
  )
}
