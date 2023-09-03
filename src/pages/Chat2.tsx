import { useEffect, useMemo, useState } from "react"
import Messages from "../components/Messages"
import { socket } from "../socket"
import { v4 as uuidv4 } from 'uuid';

type User = {
    userName: string,
    id: string
}
export type Message = {
    senderName: string,
    messageId: string,
    userId: string,
    text: string,
    receiver: string
}



export default function Chat2() {

    const [messages, setMessages] = useState<Message[]>([])
    const [user, setUser] = useState<User>()
    const [roomInput, setRoomInput] = useState("")
    const [msgInput, setMsgInput] = useState("")

    const displayMessage = (newMsg: Message) => {
        setMessages(old => {
            if (old.indexOf(newMsg) === -1) return [...old, newMsg]
            return old
        })
    }

    const handleSendBtn = () => {
        const msg: Message = { userId: user?.id ?? "unknown", text: msgInput, messageId: uuidv4(), senderName: user?.userName ?? "unknown", receiver: roomInput }
        setMsgInput("")
        socket.emit("message", msg)
        //here the message will be sent also over the socket
    }


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}")
        setUser(savedUser)

        socket.on("chat-message", (socketMsg) => {
            displayMessage(socketMsg)
        })
    }, [])
    return <div className="h-[100vh] px-36 pt-10 ">
        <h1 className="text-xl"> messages count {messages.length}</h1>
        {user && <p className="text-xl font-semibold">{user.userName} #{user.id}</p>}
        <Messages messages={messages} userId={user?.id ?? ""} />
        <div className="flex flex-row w-[80vw]">
            <input type="text" placeholder="Enter user id" className=" w-full text-xl px-2 border-[2px] h-14 mt-2 rounded-md" value={roomInput} onChange={e => setRoomInput(e.target.value)} />
        </div>
        <div className="flex flex-row w-[80vw]">
            <input type="text" placeholder="send a message" className=" w-[85%] text-xl px-2 border-[2px] h-14 mt-2 rounded-md" value={msgInput} onChange={e => setMsgInput(e.target.value)} />
            <button className=" ml-2 hover:bg-blue-500 mt-2 bg-blue-300 rounded-md w-[15%] font-semibold text-lg" onClick={handleSendBtn} >Send</button>
        </div>
    </div>
}