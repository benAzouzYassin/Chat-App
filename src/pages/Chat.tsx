import { useEffect, useState } from "react"
import Messages from "../components/messages"
type User = {
    userName: string,
    id: string
}
export type Message = {
    sender: "me" | "other",
    text: string
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([{ sender: "me", text: "hello how are you" }, { sender: "other", text: "hi i am fine what about u ?" }])
    const [user, setUser] = useState<User>()

    const sendMessage = (msg: Message) => {
        setMessages(oldMsgs => [...oldMsgs, msg])
    }

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{userName :''}")
        setUser(savedUser)
    }, [])
    return <div className="h-[100vh] px-36 pt-10 ">
        {user && <p className="text-xl font-semibold">{user.userName} #{user.id}</p>}
        <Messages messages={messages} />
        <div className="flex flex-row w-[80vw]">
            <input type="text" placeholder="Enter room id" className=" w-[85%] text-xl px-2 border-[2px] h-14 mt-2 rounded-md" />
            <button className=" ml-2 hover:bg-blue-400 mt-2 bg-blue-300 rounded-md w-[15%] font-semibold text-lg">Join room</button>
        </div>
        <div className="flex flex-row w-[80vw]">
            <input type="text" placeholder="send a message" className=" w-[85%] text-xl px-2 border-[2px] h-14 mt-2 rounded-md" />
            <button className=" ml-2 hover:bg-blue-500 mt-2 bg-blue-300 rounded-md w-[15%] font-semibold text-lg">Send</button>
        </div>
    </div>
}