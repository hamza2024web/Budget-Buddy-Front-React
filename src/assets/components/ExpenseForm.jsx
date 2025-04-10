import React, { useState } from "react";
import '../css/ExpenseForm.css';

function ExpenseForm({ onAddExpense, tags = [] }) {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || selectedTags.length === 0) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const newExpense = {
            name: title,
            tags: selectedTags
        };

        setIsSubmitting(true);

        try {
            await onAddExpense(newExpense);

            setTitle('');
            setSelectedTags([]);
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
                <label htmlFor="tags">Tags</label>
                <select 
                    id="tags" 
                    multiple
                    onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedTags(selectedOptions);
                    }} 
                    value={selectedTags}
                    disabled={isSubmitting}
                >
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>
                            {tag.tags}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
        </form>
    );
}

export default ExpenseForm;