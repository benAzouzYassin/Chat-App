import { LoggedUser } from "../pages/Chat"
import { Message } from "./Conversation"
import { useContext, useEffect, useState } from "react"
import { ConversationsContext } from "../context/ConversationsContext"

import { v4 as uuid4 } from "uuid"
import { backend } from "../api"
type Props = {
    scrollRef: React.RefObject<HTMLDivElement>
    scrollChat: () => void;
    messages: Message[],

}

export default function ConversationMessages(props: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { selectedUser } = useContext(ConversationsContext)

    const [loggedUser, setLoggedUser] = useState<LoggedUser>({})

    useEffect(() => {

        const token = localStorage.getItem("token")

        setIsLoading(true)
        backend.get(`/userData/${token}`)
            .then(res => {
                setIsLoading(false)
                setLoggedUser(res.data)
                props.scrollChat()

            })
            .catch(err => console.error(err))

        // setLoggedUser(savedUser)
    }, [])


    useEffect(() => {
        if (props.messages.length > 1) {
            setIsLoading(false)
        }
    }, [props.messages])

    const otherMessageStyle = { backgroundColor: "#e4e6eb", color: "black", borderBottomRightRadius: "5px", padding: "12px", marginLeft: "auto" }
    const userMessageStyle = { backgroundColor: "#0084ff", color: "white", borderBottomLeftRadius: "5px", padding: "10px", }

    return <div ref={props.scrollRef} className="h-[73vh]  flex flex-col overflow-y-scroll gap-3 pt-3 pl-2 pr-8  w-[97%] mx-auto  mt-2  " >
        {isLoading && <div className="absolute h-[60vh] w-[70%]  flex  ">
            <div className="loader mx-auto my-auto"></div>
        </div>}
        {!selectedUser && !isLoading && <p className="lg:text-6xl text-5xl text-center text-gray-400 font-medium italic  h-2/3 flex items-center justify-center  ">No messages To show</p>}
        {selectedUser && loggedUser.userId && props.messages.map(msg => <p className="text-md w-fit p-2 rounded-full " key={uuid4()} style={loggedUser?.userId === msg.senderId ? userMessageStyle : otherMessageStyle}>{msg.text} </p>
        )
        }

    </div >

}