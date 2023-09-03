import { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function SideNav() {

    const [usersData, setUsersData] = useState([
        { isSelected: true, lastMessage: "hii", lastMessageSender: "monsef", userImg: "", userName: "monsef hammami", userId: "3" },
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

    const updateSelected = (newSelectedId: string) => {
        setUsersData(oldData => {
            const newData = oldData.map(user => {
                if (user.userId == newSelectedId) return { ...user, isSelected: true }
                return { ...user, isSelected: false }
            })
            return newData
        })
    }

    return <div className="h-full bg-[#f9f8f8] w-[450px] shadow-xl ">
        <div className="w-full bg-[#f9f8f8] h-[10vh]  flex px-20 py-4 "><button className="bg-blue-600 hover:bg-blue-700 ml-auto mr-auto w-full rounded-xl text-2xl font-semibold italic text-[#f9f8f8]">New Message </button></div>
        <div className="bg-red-50 overflow-y-scroll h-[82vh]">
            {usersData.map(user => <SidebarItem {...user} updateSelected={updateSelected} />)}

        </div>
    </div>

}