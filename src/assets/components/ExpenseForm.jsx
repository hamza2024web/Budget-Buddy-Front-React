import React, { useState } from "react";
import '../css/ExpenseForm.css';

function ExpenseForm({ onAddExpense, tags = [] }) {
    console.log(tags)
    const [title, setTitle] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !selectedTag) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const newExpense = {
            title,
            tagId: selectedTag
        };

        setIsSubmitting(true);

        try {
            await onAddExpense(newExpense);

            setTitle('');
            setSelectedTag('');
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
                    onChange={(e) => setSelectedTag(e.target.value)} 
                    value={selectedTag}
                    disabled={isSubmitting}
                >
                    <option value="">Sélectionnez un tag</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
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
