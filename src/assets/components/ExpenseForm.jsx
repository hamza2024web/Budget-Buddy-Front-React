import React, { useState } from "react";
import '../css/ExpenseForm.css';

function ExpenseForm({ onAddExpense, categories = [] }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !amount || !date || !category) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const newExpense = {
            title,
            amount: parseFloat(amount),
            date,
            category
        };

        setIsSubmitting(true);
        
        try {
            await onAddExpense(newExpense);
            
            setTitle('');
            setAmount('');
            setDate('');
            setCategory('');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la dépense:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Ajouter une Dépense</h2>
            <div>
                <label htmlFor="title">Titre</label>
                <input 
                    id="title"
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nom de la dépense"
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="amount">Montant</label>
                <input 
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Montant de la dépense"
                    step="0.01"    
                    min="0"
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input 
                    id="date"
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="category">Catégorie</label>
                <select 
                    id="category"
                    onChange={(e) => setCategory(e.target.value)} 
                    value={category}
                    disabled={isSubmitting}
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories && categories.length > 0 ? (
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))
                    ) : (
                        <option value="alimentation">Alimentation</option>
                    )}
                </select>
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
        </form>
    );
}

export default ExpenseForm;