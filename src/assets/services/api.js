import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:82/api/expenses';
const API_BASE_URL_add = 'http://127.0.0.1:82/api/expenses';
const API_BASE_URL_update = 'http://127.0.0.1:82/api/expenses/{id}';
const API_BASE_URL_delete = 'http://127.0.0.1:82/api/expenses/{id}';
const API_BASE_URL_category = 'http://127.0.0.1:82/api/category';
const API_BASE_URL_login = 'http://127.0.0.1:82/api/login';

export const fetchExpenses = async () => {
    try{
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error){
        console.error('Erreur lors de la récupération des dépenses:',error);
        throw error;
    }
};

export const addExpense = async (expense) => {
    try{
        const response = await axios.post(API_BASE_URL_add, expense);
        return response.data;
    } catch (error){
        console.error('Erreur lors de lajout de la dépense:', error);
        throw error;
    }
};

export const updateExpense = async (expenseId, updateExpense) => {
    try {
        const response = await axios.put(`${API_BASE_URL_update}/${expenseId}`,updateExpense);
        return response.data;
    } catch (error){
        console.error('Erreur lors de la mise à jour de la dépense:',error);
        throw error;
    }
};

export const deleteExpense = async (expenseId) => {
    try{
        await axios.delete(`${API_BASE_URL_delete}/${expenseId}`);
    } catch (error){
        console.error('Error lors de la suppression de la dépense',error);
        throw error;
    }
};

export const fetchCategorie = async () => {
    try {
        const response = await axios.get(API_BASE_URL_category);
        return response.data;
    } catch (error){
        console.error('Error lors fetch The category',error);
        throw error;
    }
};

export const login = async (user) => {
    try {
        const response = await axios.post(API_BASE_URL_login,user);
        return response.data;
    } catch (error){
        console.error('Email Or Password is Incorrect',error);
        throw error;
    }
};