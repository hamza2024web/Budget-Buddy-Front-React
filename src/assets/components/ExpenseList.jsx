import React from "react";

function ExpenseList({ expenses, onDeleteExpense }) {
    if (!expenses || expenses.length === 0) {
        return (
            <div className="expense-list">
                <h2>Mes dépenses</h2>
                <p>Aucune dépense enregistrée</p>
            </div>
        );
    }

    return (
        <div className="expense-list">
            <h2>Mes dépenses</h2>
            {expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                    <div className="expense-details">
                        <h3>{expense.name}</h3>
                        <p>Tags : {expense.Tags} </p>
                    </div>
                    <div className="expense-actions">
                        <button 
                            className="delete-btn"
                            onClick={() => onDeleteExpense(expense.id)}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;