import { LoggedUser } from "../pages/Chat"
// @ts-ignore

import { useEffect, useState } from "react"
import ConversationMessages from "./ConversationMessages"
import { socket } from "../socket"
import { useContext, useRef } from "react"
import { ConversationsContext } from "../context/ConversationsContext"
import { backend } from "../api"
import { ReactComponent as SendIcon } from "../assets/sendmsg-icon.svg"



export type Message = {
    senderName: string;
    senderId: string;
    text: string;
    messageId: string
    receiver?: string
}

type Props = {
    loggedUser?: LoggedUser
}

export default function Conversation(props: Props) {

    const socketsCount = useRef(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const inputElem = useRef<HTMLInputElement>(null)
    const { selectedUser, addNewUser, highlightConv, updateConvLastMessage } = useContext(ConversationsContext)
    const [loggedUser, setLoggedUser] = useState<LoggedUser>({})
    const [messageInput, setMessageInput] = useState("")
    //this will come from api
    const [currentConvMessages, setCurrentConvMessages] = useState<Message[]>([])


    const handleKeyDown = (e: any) => {
        if (e.key == "Enter") {
            console.log("enter key pressed")
            if (messageInput) {
                sendMessage({ messageId: Date.now().toString(), senderName: loggedUser?.userName ?? "userName err", receiver: selectedUser?.userId ?? "receiver err", text: messageInput, senderId: loggedUser?.userId ?? "userId err", })
            }
        }
    }

    const scrollChat = () => {
        if (scrollRef.current) {
            console.log("should scroll")
            //@ts-ignore
            scrollRef.current.scrollBy(10, 5000)

        }
    }

    const handleSendBtn = () => {
        scrollChat()
        if (messageInput) {
            sendMessage({ messageId: Date.now().toString(), senderName: loggedUser?.userName ?? "userName err", receiver: selectedUser?.userId ?? "receiver err", text: messageInput, senderId: loggedUser?.userId ?? "userId err", })
        }

    }
    function sendMessage(newMsg: Message) {
        socket.emit("message", newMsg)
        updateConvLastMessage!(newMsg.receiver ?? "", newMsg.text, "me")
        setMessageInput("")
    }


    const displayMessage = (newMsg: Message, loggedUserId: string) => {


        if (selectedUser?.userId === newMsg.senderId || newMsg.senderId === loggedUser.userId) {
            setCurrentConvMessages(old => {
                if (old.indexOf(newMsg) === -1) return [...old, newMsg]
                return old
            })

        } else {
            highlightConv!(newMsg.senderId)
        }

        if (newMsg.senderId === loggedUserId) {

            return
        }
        updateConvLastMessage!(newMsg.senderId, newMsg.text, newMsg.senderName)
        backend.get(`/getUser/${newMsg.senderId}`)
            .then(res => {
                const user = res.data
                addNewUser!({ isSelected: false, lastMessage: newMsg.text, lastMessageSender: newMsg.senderName, userId: newMsg.senderId, userImg: user.userImg, userName: newMsg.senderName, isHighlighted: true })
            })
            .catch(err => console.error(err))

    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        backend.get(`/userData/${token}`)
            .then(res => setLoggedUser(res.data))
            .catch(err => console.error(err))


    }, [])


    useEffect(() => {
        setCurrentConvMessages([])
        if (inputElem.current) {
            inputElem.current.focus()

        }
        if (selectedUser?.userId && props.loggedUser?.userId) {
            backend.post("/conversationMessages", { senderId: props.loggedUser.userId, receiverId: selectedUser.userId })
                .then(res => {
                    setCurrentConvMessages(res.data.messages)
                })
                .catch(err => console.error(err))
        }

        socket.removeAllListeners()
        socket.on("chat-message", (socketMsg) => {
            socketsCount.current = socketsCount.current + 1
            displayMessage({ senderName: socketMsg.senderName, messageId: socketMsg.messageId, text: socketMsg.text, senderId: socketMsg.senderId, receiver: socketMsg.receiver }, loggedUser?.userId ?? "")
        })

    }, [selectedUser])

    return <div className=" w-full bg-[#FAF7EF] ">
        <div style={{ opacity: selectedUser ? "1" : "0" }} className=" shadow-lg overflow-hidden w-[97%] mx-auto mt-5 bg-[#FFFEE0] border-b-[7px]  border-l-[5px]  rounded-lg  border-black border-2  h-[95px] flex flex-row  overflow-x-hidden transition-opacity ">
            <div className=" bg-center bg-contain w-[75px] my-auto ml-5 rounded-full h-[75px]" style={{ backgroundImage: `url(${selectedUser?.userImg})` }}></div>
            <div className="ml-6 mt-4">
                <p className="text-2xl  font-semibold first-letter:uppercase" >{selectedUser?.userName}</p>
                <div className="text-md pl-3 font-medium text-gray-500 italic flex flex-row items-center ">  Online now <div className="w-2 h-2 rounded-full bg-green-500 mt-1 ml-1" ></div></div>
            </div>
        </div>

        <ConversationMessages scrollChat={scrollChat} scrollRef={scrollRef} key={selectedUser?.userId} messages={currentConvMessages} />
        {
            selectedUser &&
            <div className="w-full relative flex mt-5 pr-2" >
                <SendIcon className="absolute right-20 scale-[60%] hover:scale-[65%] hover:cursor-pointer mt-1" onClick={handleSendBtn} />
                <input ref={inputElem} value={messageInput} onChange={e => setMessageInput(e.target.value)} type="text" onKeyDown={handleKeyDown} className="italic  rounded-[19px] h-12 focus:outline-0 border-2 border-black bg-[#f9f7f2]  w-[92%] shadow-xl mx-auto pl-2 text-xl  transition-all" placeholder="Send a message" />
            </div>
        }


    </div>
}
