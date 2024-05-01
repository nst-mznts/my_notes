import React, { useState } from 'react'
import "./ListForm.scss";

function ListForm({ addListItem }) {
    const [userInput, setUserInput] = useState('');

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    const handleSaveUserInput = (event) => {
        event.preventDefault();
        addListItem(userInput);
        setUserInput('');
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            handleSaveUserInput(event);
        }
    }
    
    return (
        <form className='unordered-list-form' onSubmit={handleSaveUserInput}>
            <input 
                className='unordered-list-input'
                value={userInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Add something and press Enter..."
            />        
            <button type='submit' className='popup-add-list-button'>Add</button>
        </form>
    );
}

export default ListForm;