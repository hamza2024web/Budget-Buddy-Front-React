import { useEffect, useState } from "react";
import ExpenseList from "./assets/components/ExpenseList";
import ExpenseForm from "./assets/components/ExpenseForm";
import LoginForm from "./assets/components/LoginForm";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  fetchtags
} from './assets/services/api';
import './App.css'

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tag, setTags] = useState([])

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLogin(true)
      }
    }, [])

    useEffect(() => {
      if (isLogin) {
        const loadExpenses = async () => {
          try {
            setIsLoading(true);
            const data = await fetchExpenses();
            setExpenses(data);
          } catch (err) {
            setError('Impossible de charger les dépenses');
            console.error(err);
          } finally {
            setIsLoading(false);
          }        
        };
        loadExpenses();
      }
    }, [isLogin]);
    
    useEffect(() => {
      if (isLogin) {
        const loadTags = async () => {
          try {
            setIsLoading(true);
            const tagData = await fetchtags();
            setTags(tagData);
          } catch (err) {
            setError('Impossible de charger les tags');
            console.error(err);
          } finally {
            setIsLoading(false); 
          }
        };
        loadTags();
      }
    }, [isLogin]);

    const handleAddExpense = async (newExpense) => {
      try {
        const savedExpense = await addExpense(newExpense);
        setExpenses([...expenses, savedExpense]);
      } catch (err) {
        setError("Impossible d'ajouter la dépense");
        console.error(err);
      }
    }

    const handleDeleteExpense = async (expenseId) => { 
      try {
        await deleteExpense(expenseId);
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
      } catch (err) {
        setError("Impossible de supprimer la dépense");
        console.error(err);
      }
    }

    const handleLogin = (login) => {
      setIsLogin(login)
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLogin(false);
    }

    return (
      <div className="App">
        <header>
          <h1>BudgetBuddy</h1>
          {isLogin && (
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          )}
        </header>
        <main>
          {!isLogin ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <div className="dashboard">
              {error && <div className="error-message">{error}</div>}

              <ExpenseForm onAddExpense={handleAddExpense} tags={tag} />

              {isLoading ? (
                <p>Chargement des dépenses...</p>
              ) : (
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
              )}
            </div>
          )}
        </main>
      </div>
    );
}

export default App