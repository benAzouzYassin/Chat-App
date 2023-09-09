import { LoggedUser, UserData } from "../pages/Chat"
// @ts-ignore
import { ReactComponent as AddIcon } from '../assets/add-icon.svg'
import { ReactComponent as GifIcon } from '../assets/gif-icon.svg'
import { ReactComponent as ImgIcon } from '../assets/img-icon.svg'
import { ReactComponent as LikeIcon } from '../assets/like-icon.svg'
import { ReactComponent as SendIcon } from '../assets/send-icon.svg'
import { ReactComponent as StickerIcon } from '../assets/sticker-icon.svg'
import { useEffect, useState } from "react"
import ConversationMessages from "./ConversationMessages"
import { socket } from "../socket"
import { useContext } from "react"
import { ConversationsContext } from "../context/ConversationsContext"




export type Message = {
    senderName: string;
    senderId: string;
    text: string;
    messageId: string
    receiver?: string
}


export default function Conversation() {
    const { selectedUser, addNewUser, conversations, } = useContext(ConversationsContext)
    const [loggedUser, setLoggedUser] = useState<LoggedUser>({})
    const [messageInput, setMessageInput] = useState("")
    //this will come from api
    const [currentConvMessages, setCurrentConvMessages] = useState<Message[]>([{ messageId: "", senderId: "", senderName: "", text: "aa", receiver: "" }])

    function sendMessage(newMsg: Message) {
        socket.emit("message", newMsg)
        setMessageInput("")
    }


    const displayMessage = (newMsg: Message, loggedUserId: string) => {

        if (selectedUser?.userId === newMsg.senderId) {
            setCurrentConvMessages(old => {
                if (old.indexOf(newMsg) === -1) return [...old, newMsg]
                return old
            })
        }

        if (newMsg.senderId === loggedUserId) {
            return
        }
        addNewUser!({ isSelected: false, lastMessage: newMsg.text, lastMessageSender: newMsg.senderName, userId: newMsg.senderId, userImg: "", userName: newMsg.senderName, isHighlighted: true })
    }


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}")
        setLoggedUser(savedUser)
        socket.on("chat-message", (socketMsg) => {
            if (socketMsg.userId != savedUser?.userId) {
                console.log(`${socketMsg.senderName} sent you ${socketMsg.text}`)
                displayMessage({ senderName: socketMsg.senderName, messageId: socketMsg.messageId, text: socketMsg.text, senderId: socketMsg.senderId, receiver: socketMsg.receiver }, savedUser.userId)
            }
        })
    }, [])

    return <div className=" w-full">
        <div className="shadow-sm w-full h-[10vh] flex flex-row  overflow-x-hidden">
            <div className=" bg-center bg-contain w-20 my-auto ml-5 rounded-full h-20" style={{ backgroundImage: `url(${selectedUser?.userImg})` }}></div>
            {selectedUser && <div className="ml-6 mt-4">
                <p className="text-2xl  font-semibold first-letter:uppercase" >{selectedUser?.userName}</p>
                <div className="text-md pl-3 font-medium text-gray-500 italic flex flex-row items-center ">  Online now <div className="w-2 h-2 rounded-full bg-green-500 mt-1 ml-1" ></div></div>
            </div>}
        </div>

        <ConversationMessages key={selectedUser?.userId} messages={currentConvMessages} />
        {
            selectedUser &&
            <div className="w-full  h-[57px] flex flex-row overflow-x-hidden pl-5 gap-1" >
                <div className="flex flex-row gap-2 ">
                    <AddIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " />
                    {!messageInput && <div className="flex-row flex"><ImgIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /> <StickerIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /><GifIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /></div>}            </div>
                <input value={messageInput} onChange={e => setMessageInput(e.target.value)} type="text" className="bg-gray-200 rounded-xl h-8 mx-1  focus:outline-0 pl-2 text-lg  transition-all " placeholder="Aa" style={{ width: messageInput ? "93%" : "87%" }} />

                {messageInput ? <SendIcon className="scale-150 mt-[6px] hover:cursor-pointer hover:scale-125 rounded-xl " onClick={() => sendMessage({ messageId: crypto.randomUUID(), senderName: loggedUser?.userName ?? "userName err", receiver: selectedUser?.userId ?? "receiver err", text: messageInput, senderId: loggedUser?.userId ?? "userId err", })} /> : <LikeIcon className="scale-110 mt-[6px] hover:cursor-pointer hover:scale-125 " />}
            </div>
        }


    </div>
}