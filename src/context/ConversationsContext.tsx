import { createContext, useState } from "react";
import { UserData } from "../pages/Chat";
type Props = {
    children: string | JSX.Element | JSX.Element[]
}
type ContextType = {
    conversations: UserData[];
    addNewUser?: (newUser: UserData) => void;
    updateSelectedUser?: (userId: string) => void
    selectedUser?: UserData;
    highlightConv?: (id: string) => void;
    updateConvLastMessage?: (convId: string, lastMessage: string, lastMessageSender: string) => void
}

export const ConversationsContext = createContext<ContextType>({ conversations: [] })

export function ConversationsProvider(props: Props) {
    const [conversations, setConversations] = useState<UserData[]>([])
    const [selectedUser, setSelectedUser] = useState<UserData | undefined>()


    const updateSelectedUser = (newSelectedId: string) => {
        setConversations(oldData => {
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

    const highlightConv = (id: string) => {
        setConversations(prev => {
            return prev.map(conv => conv.userId === id ? { ...conv, isHighlighted: true } : { ...conv, isHighlighted: false })
        })
    }


    const updateConvLastMessage = (convId: string, lastMessage: string, lastMessageSender: string) => {
        setConversations(prev => prev.map(conv => conv.userId === convId ? { ...conv, lastMessage: lastMessage, lastMessageSender: lastMessageSender } : conv))
    }

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


    return <ConversationsContext.Provider value={{ conversations: conversations, addNewUser: addNewUser, updateSelectedUser: updateSelectedUser, selectedUser: selectedUser, highlightConv: highlightConv, updateConvLastMessage: updateConvLastMessage }}>
        {props.children}
    </ConversationsContext.Provider>
}