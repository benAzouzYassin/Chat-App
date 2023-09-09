import { createContext, useState } from "react";
import { UserData } from "../pages/Chat";
type Props = {
    children: string | JSX.Element | JSX.Element[]
}
type ContextType = {
    conversations: UserData[];
    addNewUser?: (newUser: UserData) => void;
    setConversations?: React.Dispatch<React.SetStateAction<UserData[]>>
}

export const ConversationsContext = createContext<ContextType>({ conversations: [] })

export function ConversationsProvider(props: Props) {
    const [conversations, setConversations] = useState<UserData[]>([])


    const addNewUser = (newUser: UserData) => {

        setConversations(old => {
            const user = old.find((user) => user.userId == newUser.userId)
            if (user) {
                return old
            } else {
                return [newUser, ...old]
            }
        })
    }


    return <ConversationsContext.Provider value={{ conversations: conversations, addNewUser: addNewUser, setConversations: setConversations }}>
        {props.children}
    </ConversationsContext.Provider>
}