import { Message } from "../pages/Chat"

type Props = {
    messages: Message[]
}
export default function Messages(props: Props) {

    return <div className="w-[80vw] border-2 border-black h-[65vh] rounded-2xl px-5 pt-5 mt-10" >
        {
            props.messages.map(msg => <p className="text-xl"><span className="font-bold">{msg.sender} : </span> {msg.text}</p>)
        }
    </div>
}