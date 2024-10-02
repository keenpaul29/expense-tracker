import {auth, provider} from "../../config/firebase-config"
import {signInWithPopup} from 'firebase/auth'
import {useNavigate, Navigate} from 'react-router-dom'
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
export const Auth = () => {
    const navigate = useNavigate()
    const {isAuth} = useGetUserInfo()
    
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        }
        localStorage.setItem("auth",JSON.stringify(authInfo))
        navigate("/expense-tracker")
    }

    if (isAuth) {
        return <Navigate to="/expense-tracker"/>
    }

    return <div className="w-screen h-[calc(100vh)] flex flex-col justify-center items-center text-[white] [text-shadow:-1px_2px_6px_rgba(2,_48,_71,_0.54)] bg-[rgb(0,_204,_255)] bg-[linear-gradient(_90deg,_rgba(0,_204,_255,_1)_0%,_rgba(115,_33,_188,_1)_100%_)]">
        <p className="text-[50px] font-bold">Sign-in to open Expense Tracker</p>
        <a className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75" >
  <span
    className="block rounded-full bg-slate-400 px-8 py-3 text-sm font-medium group-hover:bg-transparent" onClick={signInWithGoogle}>
    Sign in to Google
  </span>
</a>
    </div>
}