import SidebarItem from "./SidebarItem";
import { LoggedUser } from "../pages/Chat";
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import { useContext, useState } from "react"
import { ConversationsContext } from "../context/ConversationsContext"
import { backend } from "../api";


type Props = {

    loggedUser?: LoggedUser
}

export default function SideNav(props: Props) {
    const { addNewUser, updateSelectedUser } = useContext(ConversationsContext)
    const { conversations } = useContext(ConversationsContext)
    const [searchInput, setSearchInput] = useState("")

    const handleSearchBtn = () => {

        backend.get(`/getUser/${searchInput}`)
            .then(res => {
                const user = res.data
                if (user) {
                    addNewUser!({ isSelected: false, lastMessage: "", lastMessageSender: "", userId: user.userId, userImg: user.userImg, userName: user.userName, isHighlighted: false })
                }
            })
            .catch(err => console.error(err))

        setSearchInput("")

        updateSelectedUser!(searchInput)

    }


    return <div className="h-full bg-[#FAF7EF] w-[500px] shadow-2xl ">

        <div className="w-full  bg-[#FAF7EF] h-[10vh]  flex ">
            <div className="w-[65px] bg-red-500 rounded-full h-[65px] mt-4 ml-5 bg-contain bg-center shadow-md " style={{ backgroundImage: `url(${props.loggedUser?.userImg})` }}></div>
            <div className="flex flex-col">
                <p className="text-xl first-letter:uppercase font-semibold tracking-wide mt-1 pt-5 ml-3">{props.loggedUser?.userName}</p>
                <span className="text-sm  ml-4 italic text-stone-700">#{props.loggedUser?.userId}</span>

            </div>

        </div>


        <div className=" overflow-hidden mx-auto mt-5 w-[95%] border-2 border-black rounded-xl flex flex-col h-[86vh] bg-[#FFFEE0]">
            {/* <button className="w-[97%] mb-1 mx-auto  h-[60px]  flex rounded-xl hover:cursor-pointer  bg-blue-500 hover:bg-blue-400 items-center justify-center mt-2" onClick={props.openPopup}><p className="text-white font-semibold text-5xl mt-[-10px]">+</p> <p className="  ml-1 text-[#f9f8f8] font-semibold italic  text-2xl"> New Message</p></button> */}
            <div className="  relative flex ">
                <SearchIcon style={{ opacity: searchInput ? "1" : "0" }} className="transition-opacity duration-300 absolute top-10 right-10 scale-75 ml-auto hover:cursor-pointer hover:scale-[80%] " onClick={handleSearchBtn} />
                <input type="text" className="my-8 w-[90%] border-[1px] border-black shadow-[2px_4px_3px_0px_rgba(0,0,0,0.4)] rounded-full h-14  mx-auto focus:outline-none text-xl italic pl-4" placeholder="Enter User Id" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            {conversations && conversations.map(user => <SidebarItem {...user} key={user.userId} loggedUserId={props.loggedUser?.userId ?? ""} />)}
        </div>
        {/* <div className="flex text-lg font-semibold pl-5 pt-5 italic ">{props.loggedUser?.userName} #{props.loggedUser?.userId}</div> */}
    </div>

}