import SidebarItem from "./SidebarItem";
import { LoggedUser } from "../pages/Chat";
import logo from "../assets/logo.png"
import { useContext } from "react"

import { ConversationsContext } from "../context/ConversationsContext"

type Props = {

    openPopup: () => void,
    loggedUser?: LoggedUser
}

export default function SideNav(props: Props) {
    const { conversations } = useContext(ConversationsContext)
    return <div className="h-full bg-[#f9f8f8] w-[450px] shadow-xl ">

        <div className="w-full  bg-[#f9f8f8] h-[10vh]  flex cursor-pointer shadow-sm  ">
            <img src={logo} width="auto" height="auto" className=" scale-75" alt="" />
            <p className="text-5xl font-semibold  italic  text-center pt-5 ">Messanger</p>
        </div>


        <div className=" overflow-y-scroll h-[82vh]">
            <button className="w-[97%] mb-1 mx-auto  h-[60px]  flex rounded-xl hover:cursor-pointer  bg-blue-500 hover:bg-blue-400 items-center justify-center mt-2" onClick={props.openPopup}><p className="text-white font-semibold text-5xl mt-[-10px]">+</p> <p className="  ml-1 text-[#f9f8f8] font-semibold italic  text-2xl"> New Message</p></button>

            {conversations && conversations.map(user => <SidebarItem {...user} key={user.userId} />)}
        </div>
        <div className="flex text-lg font-semibold pl-5 pt-5 italic ">{props.loggedUser?.userName} #{props.loggedUser?.userId}</div>
    </div>

}