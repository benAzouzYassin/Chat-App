import { useState } from "react"
import { useContext } from "react"
import { ConversationsContext } from "../context/ConversationsContext"
import { backend } from "../api"

type Props = {
    isPopupOpen: boolean,
    closePopup: () => void,
}

export default function SearchPopup(props: Props) {
    const [searchInput, setSearchInput] = useState("")
    const { addNewUser, updateSelectedUser } = useContext(ConversationsContext)
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

        props.closePopup()
    }

    // by clicking on the send message the user should be added to the sidebar
    return <div className=" z-10 flex items-center justify-center bg-[#00000098] h-full w-full absolute" style={{ display: props.isPopupOpen ? "flex" : "none" }} onClick={props.closePopup}>
        <div className="z-50 lg:w-1/4 w-1/2 h-60 bg-[#222222] mt-[0px] rounded-2xl flex flex-col justify-center px-5" onClick={(e) => e.stopPropagation()}>
            <input type="text" className="h-1/4 mt-[-50px] rounded-lg pl-2 text-2xl italic focus:outline-none bg-[#e0e0e0]" placeholder="User ID" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
            <button onClick={handleSearchBtn} className="bg-sky-600 rounded-lg mt-5 h-12 hover:bg-sky-700 text-[#e0e0e0] text-xl w-1/2 mx-auto font-medium italic">send message</button>
        </div>
    </div >
}

