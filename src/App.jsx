import { useEffect, useState } from "react";
import ExpenseList from "./assets/components/ExpenseList";
import ExpenseForm from "./assets/components/ExpenseForm";
import LoginForm from "./assets/components/LoginForm";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  fetchCategorie
} from './assets/services/api';
import './App.css'

function App(){
    const [isLogin, setIsLogin] = useState(false)
    const [expenses,setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState([])

    useEffect(() => {
      const loadExpenses = async () => {
        try {
          setIsLoading(true);
          const data = await fetchExpenses();
          setExpenses(data);
          setIsLoading(false);
        } catch (err){
          setError('Impossible de charger les dépenses');
          setIsLoading(false);
        }
      };
      loadExpenses();
    }, []);
    
    useEffect (() => {
      const loadCategory = async () => {
        try {
          setIsLoading(true);
          const category = await fetchCategorie();
          setCategory(category);
          setIsLoading(false);
        } catch (err){
          setError('Impossible de charger les category');
          setIsLoading(false);
        }
      };
      loadCategory();
    }, []);

    const handleAddExpense = (newExpense) => {
      setExpenses([...expenses, newExpense])
    }

    const handleDeleteExpense = (expenseId) => { 

      setExpenses(expenses.filter(expense => expense.id !== expenseId))
    }

    const handleLogin = (login) => {
      setIsLogin(login)
    }

    return (
      <div className="App">
        <header>
          <h1>BudgetBuddy</h1>
        </header>
        <main>
          {!isLogin && (
            <LoginForm onLogin={handleLogin}></LoginForm>   

          )}
        </main>



      </div>
    );
}

export default App