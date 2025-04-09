import React,{useState} from "react";
import '../css/ExpenseForm.css';

function ExpenseForm({ onAddExpense }){
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !amount || !date || !category){
            alert('Veuillez remplir tous les champs')
            return
        }

        const newExpense = {
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            date,
            category
        }

        onAddExpense(newExpense)

        setTitle('')
        setAmount('')
        setDate('')
        setCategory('')
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
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Montatnt de la dépense"
                    step="0.01"    
                    min="0"
                />
            </div>
            <div>
                <label>Date</label>
                <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label >Category</label>
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="alimentation">Alimentation</option>
                    <option value="transport">Transport</option>
                    <option value="loisirs">Loisirs</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <button type="submit">Ajouter</button>
        </form>
    )
}
export default ExpenseForm