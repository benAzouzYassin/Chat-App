import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom"
//TODO: validate the userName input

export default function Login() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const handleClick = (e: any) => {
        e.preventDefault()
        localStorage.setItem("user", JSON.stringify({ "userName": userName, "id": uuidv4() }))
        navigate("/chat ")
    }
    return <>
        <form className="h-[100vh] bg-[rgb(31,31,31)] flex flex-col items-center justify-center">
            <div className="flex w-full gap-3 justify-center ">
                <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <button onClick={handleClick} className="bg-[#0d6efd] hover:bg-[#467ed8] text-white text-xl font-semibold w-32 h-16 rounded-lg ">Login</button>
            </div>
        </form>
    </>
}