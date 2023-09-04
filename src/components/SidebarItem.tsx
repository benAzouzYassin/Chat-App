
type Props = {
    userImg: string,
    userName: string,
    lastMessage: string,
    lastMessageSender: string,
    userId: string,
    isSelected: boolean,
    updateSelected: (newSelectedId: string) => void
}



export default function SidebarItem(props: Props) {
    return <div className="w-full  h-[100px]  border-b-2 hover:bg-[#e9e9e9] hover:cursor-pointer rounded-2xl flex flex-row " style={{ backgroundColor: props.isSelected ? "#e9e9e9" : "" }} onClick={() => props.updateSelected(props.userId)}>

        <div className="w-[68px] bg-white rounded-full h-[70%] ml-3 bg-contain bg-center shadow-md mt-auto mb-auto" style={{ backgroundImage: `url(${props.userImg})` }}></div>
        <div className="flex flex-col ml-3">
            <p className="text-lg mt-5 font-semibold">{props.userName}</p>
            <p className="text-sm text-gray-500 mt-1 italic"><span className="">{props.lastMessageSender}</span>:  {props.lastMessage}</p>
        </div>
    </div>
}