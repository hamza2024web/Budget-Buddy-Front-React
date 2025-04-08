import React,{useState} from "react";

function ExpenseForm({ onAddExpense }){
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !amount || !date){
            alert('Veuillez remplir tous les champs')
            return
        }

        const newExpense = {
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            date
        }

        onAddExpense(newExpense)

        setTitle('')
        setAmount('')
        setDate('')
    }

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Ajouter une Dépense</h2>
            <div>
                <label>Titre</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nom de la dépense"
                />
            </div>
            <div>
                <label>Montant</label>
                <input 
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Montatnt de la dépense"
                    step="0.01"    
                />
            </div>
            <div>
                <label>Date</label>
                <input 
                type="text" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button type="submit">Ajouter</button>
        </form>
    )
}
export default ExpenseForm