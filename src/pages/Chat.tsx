import { useEffect, useState, useContext } from "react";
import SideNav from "../components/SideNav";
import Conversation from "../components/Conversation";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { backend } from "../api";
import { ConversationsContext } from "../context/ConversationsContext"
export type UserData = {
    isSelected?: boolean;
    lastMessage: string;
    lastMessageSender: string;
    userImg: string;
    userName: string;
    userId: string;
    isHighlighted?: boolean
}
export type LoggedUser = {
    userName?: string,
    userId?: string
    userImg?: string
}

export default function Chat() {
    const { fetchSavedConversations } = useContext(ConversationsContext)
    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    //this will come from api


    useEffect(() => {
        const token = localStorage.getItem("token")
        backend.get(`/userData/${token}`)
            .then(res => {

                setLoggedUser(res.data)
                fetchSavedConversations!(token ?? "")
            })
            .catch(err => navigate("/login"))

        if (!token) {
            navigate("/login")
        }

    }, [])
    useEffect(() => {
        if (loggedUser?.userId && loggedUser.userName) {
            socket.emit("join-room", {
                roomId: loggedUser?.userId,
                userName: loggedUser?.userName,
            });
        }
    }, [loggedUser])





    return <main className=" h-[100vh] flex flex-row relative overflow-hidden">
        <SideNav loggedUser={loggedUser} />
        <Conversation loggedUser={loggedUser} />
    </main>
}