import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import Conversation from "../components/Conversation";
import SearchPopup from "../components/SearchPopup";
import { useNavigate } from "react-router-dom";
export type UserData = {
    isSelected: boolean;
    lastMessage: string;
    lastMessageSender: string;
    userImg: string;
    userName: string;
    userId: string;
}
export type LoggedUser = {
    userName: string,
    userId: string
}

export default function Chat() {

    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
    //this will come from api
    const [usersData, setUsersData] = useState<UserData[]>([
        { isSelected: false, lastMessage: "hii", lastMessageSender: "monsef", userImg: "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/345614776_207673392034446_3625958973823036530_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=zkrRxmyxnVIAX-Nx76o&_nc_ht=scontent.ftun16-1.fna&oh=00_AfAdsDCwLhNnJiVBNJFV56kZa1ktCk97YP_XMH2Hbd70tw&oe=64FA852E", userName: "monsef hammami", userId: "3" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "12" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "13" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "15" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "16" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "17" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "18" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "19" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "1152" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "100" },
        { isSelected: false, lastMessage: "jib chkoba", lastMessageSender: "Houssem", userImg: "", userName: "Houssem ben jaafer", userId: "10d" },
        { isSelected: false, lastMessage: "waa wink cv ?", lastMessageSender: "me", userImg: "", userName: "yassine ben azouz", userId: "2" }
    ])


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user") ?? "{}")
        const token = localStorage.getItem("token")
        if (!savedUser || !savedUser.userName || !savedUser.userId || !token) {
            navigate("/login")
        } else {
            setLoggedUser(savedUser)
        }

    }, [])




    const updateSelected = (newSelectedId: string) => {
        setUsersData(oldData => {
            const newData = oldData.map(user => {
                if (user.userId == newSelectedId) {
                    setSelectedUser({ ...user, isSelected: true })
                    return { ...user, isSelected: true }
                }

                return { ...user, isSelected: false }
            })
            return newData
        })
    }
    const addNewUser = (newUser: UserData) => {
        setUsersData(old => {
            old.unshift(newUser)
            return old
        })
    }
    const closePopup = () => setIsPopupOpen(false)
    const openPopup = () => setIsPopupOpen(true)

    return <main className=" h-[100vh] flex flex-row relative">
        <SearchPopup isPopupOpen={isPopupOpen} closePopup={closePopup} addNewUser={addNewUser} updateSelected={updateSelected} />
        <SideNav updateSelected={updateSelected} usersData={usersData} openPopup={openPopup} loggedUser={loggedUser} />
        <Conversation selectedUser={selectedUser} loggedUser={loggedUser} />
    </main>
}