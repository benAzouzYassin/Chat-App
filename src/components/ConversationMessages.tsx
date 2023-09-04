import { UserData } from "../pages/Chat"
import { LoggedUser, Message } from "./Conversation"

import { v4 as uuid4 } from "uuid"
type Props = {
    selectedUser: UserData | null,
    messages: Message[],
    loggedUser: LoggedUser | undefined,

}

export default function ConversationMessages(props: Props) {
    const loggedUserId = props.loggedUser ? props.loggedUser.id : null
    const otherMessageStyle = { backgroundColor: "#e4e6eb", color: "black", borderBottomRightRadius: "5px", padding: "12px", marginLeft: "auto" }
    const userMessageStyle = { backgroundColor: "#0084ff", color: "white", borderBottomLeftRadius: "5px", padding: "10px", }
    return <div className="h-[84vh] flex flex-col overflow-y-scroll gap-3 pt-3 pl-2 pr-8">
        {!props.selectedUser && <p className="text-6xl text-gray-400 font-medium italic  h-2/3 flex items-center justify-center ">No messages To show</p>}
        {props.selectedUser && loggedUserId && props.messages.map(msg => <p className="text-md w-fit p-2 rounded-full " key={uuid4()} style={props.loggedUser?.id === msg.senderId ? userMessageStyle : otherMessageStyle}>{msg.msgText}</p>)}
    </div >

}