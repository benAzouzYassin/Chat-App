import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import Conversation from "../components/Conversation";
import SearchPopup from "../components/SearchPopup";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useContext } from "react";
import { ConversationsContext } from "../context/ConversationsContext"
export type UserData = {
    isSelected: boolean;
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
}

export default function Chat() {
    const { setConversations } = useContext(ConversationsContext)
    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserData | undefined>()

    //this will come from api


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}")
        const token = localStorage.getItem("token")
        if (!savedUser || !savedUser.userName || !savedUser.userId || !token) {
            navigate("/login")
        } else {
            setLoggedUser(savedUser)
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


    const updateSelectedUser = (newSelectedId: string) => {
        setConversations!(oldData => {
            const newData = oldData.map(user => {
                if (user.userId == newSelectedId) {
                    setSelectedUser({ ...user, isSelected: true, isHighlighted: false })
                    return { ...user, isSelected: true, isHighlighted: false }
                }

                return { ...user, isSelected: false }
            })
            return newData
        })
    }


    const closePopup = () => setIsPopupOpen(false)
    const openPopup = () => setIsPopupOpen(true)

    return <main className=" h-[100vh] flex flex-row relative">
        <SearchPopup isPopupOpen={isPopupOpen} closePopup={closePopup} updateSelectedUser={updateSelectedUser} />
        <SideNav openPopup={openPopup} loggedUser={loggedUser} updateSelectedUser={updateSelectedUser} />
        <Conversation selectedUser={selectedUser} />
    </main>
}