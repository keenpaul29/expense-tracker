import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.css"
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction()
    const {transactions, transactionTotals} = useGetTransactions()
    const {name, profilePhoto} = useGetUserInfo()
    const navigate = useNavigate()


    const [description, setDescription] = useState("")
    const [transactionAmount,setTransactionAmount] = useState(0)
    const [transactionType, setTransactionType] = useState("expense")

    const {balance, income, expenses} = transactionTotals

    const onSubmit = (e) => {
        e.preventDefault()
        addTransaction({
            description,
            transactionAmount,
            transactionType
        })
        setDescription("");
        setTransactionAmount(0);
    }

    const signUserOut = async() => {
        try {
        await signOut(auth)
        localStorage.clear()
        navigate("/")
        } catch (err) {
            console.error(err)
        }
    }


    return (
    <>
    <div className="expense-tracker">
        <div className="flex flex-col justify-center items-center gap-[40px] pt-[20px]">
           <h1 className='text-[40px]'> {name}'s Expense Tracker </h1> 
           {profilePhoto && (<div className='profile'><img className='profile-photo' src={profilePhoto} alt='profile' />
            <button className='inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500' onClick={signUserOut}>Sign Out</button>
        </div>)}
           <div className="balance">
            <h3>Your Balance</h3>
            {balance >0 ? (
                <h2>${balance}</h2>
            ) : (
                <h2>-$ {Math.abs(balance)}</h2>
            )}
           </div>
           <div className="flex flex-col justify-start items-start gap-[50px]">
            <div className="income">
                <h4>Income</h4>
                <p>${income}</p>
            </div>
            <div className="expense">
                <h4>Expense</h4>
                <p>${expenses}</p>
            </div>
           </div>
           <form className="add-transaction" onSubmit={onSubmit}>
            <input type="text" placeholder="Enter description" className="mt-1 w-full rounded-md bg-slate-300 border-gray-200 shadow-sm sm:text-sm" required value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="text" placeholder="Amount" className= "mt-1 w-full rounded-md bg-slate-300 border-gray-200 shadow-sm sm:text-sm" required value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} />
            <input type="radio" id="expense" value="expense" checked={transactionType==="expense"} onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="expense">Expense</label>
            <input type="radio" id="income" value="income" checked={transactionType==="income"} onChange={(e) => setTransactionType(e.target.value)}/>
            <label htmlFor="income">Income</label>

            <button type="submit" className='inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'>Add Transaction</button>
           </form>

        </div>
        
     </div>
     <div className="transactions">
        <h2>Transactions</h2>
        <ul>
            {transactions.map((transaction)=> {
                const {description, transactionAmount, transactionType} = transaction;
                return (
                    <li>
                        <h4>{description}</h4>
                        <p>${transactionAmount} * <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
                    </li>
                )
            })}
        </ul>
     </div>
    </> 
     )
    
    
}