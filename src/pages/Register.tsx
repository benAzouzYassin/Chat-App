import { useEffect, useState } from "react"
import { backend } from "../api"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    //
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        backend.get(`/userData/${token}`)
            .then(res => navigate("/chat"))
    }, [])



    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (password == "" || password.length > 15) {
            setErrorMessage("unvalid password")
        }
        if (userName == "" || userName.length > 15) {
            setErrorMessage("unvalid user name")

        }
        if (password != passwordValidation) {
            setErrorMessage("the password and the password validation should be the same")
        }
        if (userName.length < 15 && userName.length > 0 && password.length > 0 && password.length < 15 && password === passwordValidation) {
            //navigate("/chat ")
            //the api call to the login and the local storage storing
            setIsLoading(true)
            backend.post("/signup", { userName: userName, password: password, userImg: "https://scontent.ftun16-1.fna.fbcdn.net/v/t1.6435-9/117313334_768355490388113_5149658742314683385_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=gejQinfeDXIAX8CvePK&_nc_ht=scontent.ftun16-1.fna&oh=00_AfC3dLzp1bNFFZbh2xxaLerGCS6g1ZIgs93MxFuFnWKJPw&oe=65229BC7" })
                .then((res) => {
                    setIsLoading(false)
                    setErrorMessage("")

                    setIsLoading(false)
                    const token = res.data.token
                    localStorage.setItem("token", token)
                    navigate("/chat")
                })
                .catch((err) => {
                    const errMsg = err.response.data.message

                    setErrorMessage(errMsg ? errMsg : "Network error")
                    setIsLoading(false)
                })
            setErrorMessage("")
        }

    }
    return <>
        <form className="h-[100vh] bg-[rgb(31,31,31)] flex flex-col items-center justify-center">
            {isLoading && <p className="text-white text-xl ">LOADING....</p>}

            <div className="flex w-full gap-5 items-center flex-col">
                <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <input type="password" placeholder="validate your password" value={passwordValidation} onChange={(e) => setPasswordValidation(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <button onClick={handleSubmit} className="bg-[#0d6efd] hover:bg-[#467ed8] text-white text-xl font-semibold w-1/3 h-14 rounded-lg ">Register</button>
                {errorMessage && <p className="text-lg italic text-red-500 w-1/3 mt-[-10px] mb-[-10px]">{errorMessage}</p>}
                <p className="text-white w-1/3 text-lg mt-[-5px] italic hover:cursor-pointer underline" onClick={() => navigate("/login")}>Have an account?</p>
            </div>
        </form>
    </>
}