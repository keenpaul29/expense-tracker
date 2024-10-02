import { useEffect, useState } from "react";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { collection } from "firebase/firestore";


export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0
    });
    const {userID} = useGetUserInfo()
    
    const transactionCollectionRef = collection(db, "transactions")

    const getTransactions = async () => {
        let unsubscribe;
        try {
           const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"))
           unsubscribe = onSnapshot(queryTransactions, (snapshot)=> {

            let docs = []
            let totalIncome = 0
            let totalExpenses = 0
            snapshot.forEach((doc)=> {
                const data = doc.data()
                const id = doc.id
                docs.push({...data,id})

                if (data.transactionType === "expense") {
                    totalExpenses += Number(data.transactionAmount);

                } else {
                    totalIncome += Number(data.transactionAmount);
                }
            })

            setTransactions(docs)
            setTransactionTotals({
                balance: totalIncome - totalExpenses,
                income: totalIncome,
                expenses: totalExpenses
            })

           })
        } catch (err) {
           console.log(err);
        }
        
    }

    useEffect(() => {
      getTransactions()
    }, [])
    
    return { transactions, transactionTotals };
}