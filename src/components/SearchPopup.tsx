import { useState } from "react"
import { UserData } from "../pages/Chat"


type Props = {
    isPopupOpen: boolean,
    closePopup: () => void,
    addNewUser: (newUser: UserData) => void
    updateSelected: (newSelectedId: string) => void
}

export default function SearchPopup(props: Props) {
    const [searchInput, setSearchInput] = useState("")

    const handleSearchBtn = () => {
        // this data will come from api
        props.addNewUser({ isSelected: false, lastMessage: "", lastMessageSender: "", userImg: "", userName: "test", userId: searchInput })
        setSearchInput("")
        props.updateSelected(searchInput)
        props.closePopup()
    }

    // by clicking on the send message the user should be added to the sidebar
    return <div className=" z-10 flex items-center justify-center bg-[#00000098] h-full w-full absolute" style={{ display: props.isPopupOpen ? "flex" : "none" }} onClick={props.closePopup}>
        <div className="z-50 w-1/4 h-60 bg-[#222222] mt-[0px] rounded-2xl flex flex-col justify-center px-5" onClick={(e) => e.stopPropagation()}>
            <input type="text" className="h-1/4 mt-[-50px] rounded-lg pl-2 text-2xl italic focus:outline-none bg-[#e0e0e0]" placeholder="User ID" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
            <button onClick={handleSearchBtn} className="bg-sky-600 rounded-lg mt-5 h-12 hover:bg-sky-700 text-[#e0e0e0] text-xl w-1/2 mx-auto font-medium italic">send message</button>
        </div>
    </div >
}

