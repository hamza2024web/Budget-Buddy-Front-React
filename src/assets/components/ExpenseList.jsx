import React from "react";

function ExpenseList ({expenses}){
    return (
        <div className="expense-list">
            <h2>Mes dépenses</h2>
            {expenses.length === 0 ?(
                <p>Aucune dépense enregistrée</p>
            ) : (
                expenses.map(expense => (
                    <div key={expense.id} className="expense-item">
                        <h3>{expense.title}</h3>
                        <p>Montant : {expense.amount} $</p>
                        <p>Date : {expense.date}</p>
                        <p>Category : {expense.category}</p>
                    </div>
                ))
            )}
        </div>
    )
}
export default ExpenseList