import { UserData } from "../pages/Chat"
// @ts-ignore
import { ReactComponent as AddIcon } from '../assets/add-icon.svg'
import { ReactComponent as GifIcon } from '../assets/gif-icon.svg'
import { ReactComponent as ImgIcon } from '../assets/img-icon.svg'
import { ReactComponent as LikeIcon } from '../assets/like-icon.svg'
import { ReactComponent as SendIcon } from '../assets/send-icon.svg'
import { ReactComponent as StickerIcon } from '../assets/sticker-icon.svg'
import { useEffect, useState } from "react"
import ConversationMessages from "./ConversationMessages"
import { json } from "react-router-dom"

type Props = {
    selectedUser: UserData | null
}

export type LoggedUser = {
    userName: string,
    id: string
}

export type Message = {
    senderName: string;
    senderId: string;
    msgText: string;
}
//TODO create the Messages state

export default function Conversation(props: Props) {

    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    const [messageInput, setMessageInput] = useState("")
    //this will come from api
    const [messages, setMessages] = useState<Message[]>([
        { senderName: "Houssem ben jaafer", senderId: "12354", msgText: "hello how are you" },
        { senderName: "yassine ben azouz", senderId: "a13c39d4-e1fd-4452-89ed-8ee61170fb1e", msgText: "hello how are you" },
        { senderName: "Houssem ben jaafer", senderId: "aa", msgText: "hello how are you" },
        { senderName: "Houssem ben jaafer", senderId: "154", msgText: "hello how are you" },
        { senderName: "Houssem ben jaafer", senderId: "1", msgText: "hello how are you" }
    ])

    function sendMessage(newMsg: Message) {
        setMessages(old => [...old, newMsg])
        setMessageInput("")
    }

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}")
        setLoggedUser(savedUser)
        console.log(savedUser)
    }, [])
    return <div className=" w-full">
        <div className="shadow-sm w-full h-[10vh] flex flex-row  overflow-x-hidden">
            <div className=" bg-center bg-contain w-20 my-auto ml-5 rounded-full h-20" style={{ backgroundImage: `url(${props.selectedUser?.userImg})` }}></div>
            {props.selectedUser && <div className="ml-6 mt-4">
                <p className="text-2xl  font-semibold first-letter:uppercase" >{props.selectedUser?.userName}</p>
                <div className="text-md pl-3 font-medium text-gray-500 italic flex flex-row items-center ">  Online now <div className="w-2 h-2 rounded-full bg-green-500 mt-1 ml-1" ></div></div>
            </div>}
        </div>

        <ConversationMessages key={props.selectedUser?.userId} selectedUser={props.selectedUser} messages={messages} loggedUser={loggedUser} />
        {
            props.selectedUser &&
            <div className="w-full  h-[57px] flex flex-row overflow-x-hidden pl-5 gap-1" >
                <div className="flex flex-row gap-2 ">
                    <AddIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " />
                    {!messageInput && <div className="flex-row flex"><ImgIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /> <StickerIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /><GifIcon className="scale-105 hover:cursor-pointer hover:bg-gray-300 rounded-xl " /></div>}            </div>
                <input value={messageInput} onChange={e => setMessageInput(e.target.value)} type="text" className="bg-gray-200 rounded-xl h-8 mx-1  focus:outline-0 pl-2 text-lg  transition-all " placeholder="Aa" style={{ width: messageInput ? "93%" : "87%" }} />

                {messageInput ? <SendIcon className="scale-150 mt-[6px] hover:cursor-pointer hover:scale-125 rounded-xl " onClick={() => sendMessage({ msgText: messageInput, senderId: loggedUser?.id ?? "", senderName: loggedUser?.id ?? "" })} /> : <LikeIcon className="scale-110 mt-[6px] hover:cursor-pointer hover:scale-125 " />}
            </div>
        }


    </div>
}