import { LoggedUser, UserData } from "../pages/Chat"
import { Message } from "./Conversation"
import { useContext, useEffect, useState } from "react"
import { ConversationsContext } from "../context/ConversationsContext"

import { v4 as uuid4 } from "uuid"
type Props = {
    messages: Message[],

    selectedUser?: UserData
}

export default function ConversationMessages(props: Props) {

    const [loggedUser, setLoggedUser] = useState<LoggedUser>({})

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}")
        setLoggedUser(savedUser)
    }, [])

    const otherMessageStyle = { backgroundColor: "#e4e6eb", color: "black", borderBottomRightRadius: "5px", padding: "12px", marginLeft: "auto" }
    const userMessageStyle = { backgroundColor: "#0084ff", color: "white", borderBottomLeftRadius: "5px", padding: "10px", }
    return <div className="h-[84vh] flex flex-col overflow-y-scroll gap-3 pt-3 pl-2 pr-8">
        {!props.selectedUser && <p className="text-6xl text-gray-400 font-medium italic  h-2/3 flex items-center justify-center ">No messages To show</p>}
        {props.selectedUser && loggedUser.userId && props.messages.map(msg => <p className="text-md w-fit p-2 rounded-full " key={uuid4()} style={loggedUser?.userId === msg.senderId ? userMessageStyle : otherMessageStyle}>{msg.text} (from {msg.senderId})</p>)}
    </div >

}