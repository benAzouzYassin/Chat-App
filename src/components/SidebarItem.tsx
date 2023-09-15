import { useContext } from "react"

import { ConversationsContext } from "../context/ConversationsContext"
import { UserData } from "../pages/Chat"

type Props = {
    loggedUserId: string
} & UserData



export default function SidebarItem(props: Props) {
    const { updateSelectedUser, } = useContext(ConversationsContext)
    const bgColor = props.isHighlighted ? "red" : props.isSelected ? "rgb(195,204,254)" : ""
    return <div className="w-full  h-[80px]  border-b-2 hover:border-b-[1px] border-black hover:scale-105   hover:bg-[rgb(217,223,255)] hover:cursor-pointer  flex flex-row " style={{ backgroundColor: bgColor }} onClick={() => {
        updateSelectedUser!(props.userId)

    }}>

        <div className="w-[50px] bg-white rounded-full h-[50px] ml-3 bg-cover bg-center shadow-md mt-auto mb-auto" style={{ backgroundImage: `url(${props.userImg})` }}></div>
        <div className="flex flex-col ml-3">
            <p className="text-lg mt-5 font-semibold">{props.userName}</p>
            <p className="text-sm text-gray-500  italic pl-2 "><span className="">{props.lastMessageSender === props.loggedUserId ? "Me" : props.userName}</span>:  {props.lastMessage}</p>
        </div>
    </div>
}