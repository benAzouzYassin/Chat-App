
import { v4 as uuidv4 } from 'uuid';
import { Message } from './Conversation';
type Props = {
    messages: Message[]
    userId: string
}
export default function Messages(props: Props) {

    return <div className="w-[80vw] border-2 border-black h-[65vh] rounded-2xl px-5 pt-5 mt-10 overflow-y-scroll" >
        {
            props.messages.map(msg => <p className="text-xl" key={uuidv4()}><span className="font-bold">{msg.senderId === props.userId ? "me" : msg.senderName} : </span> {msg.text}</p>)
        }
    </div>
}