import { useState } from "react";
import ExpenseList from "./assets/components/ExpenseList";
import ExpenseForm from "./assets/components/ExpenseForm";
import './App.css'

function App(){
    const [expenses,setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAddExpense = (newExpense) => {
      setExpenses([...expenses, newExpense])
    }

    const handleDeleteExpense = (expenseId) => { 
      
      setExpenses(expenses.filter(expense => expense.id !== expenseId))
    }

    return (
      <div className="App">
        <header>
          <h1>BudgetBuddy</h1>
        </header>

        <main>
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses}/>
        </main>

        {isLoading && <p>Chargement...</p>}
        {error && <p className="error">{error}</p>}
      </div>
    )
}

export default App