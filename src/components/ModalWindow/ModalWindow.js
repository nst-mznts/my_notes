import './ModalWindow.scss';
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ListForm from "../ListForm/ListForm";
import TagList from '../TagList/TagList';
import { nanoid } from 'nanoid';

function ModalWindow({ openedNote, onSave, onClose }) {
    const [noteTitle, setNoteTitle] = useState(openedNote.title || '');
    const [noteText, setNoteText] = useState(openedNote.text || '');
    const [selectedNoteTagIds, setSelectedNoteTagIds] = useState(openedNote.tags  || []);
    const [listOfItems, setListOfItems] = useState(openedNote.list || []);

    const handleSaveNote = () => {
        if (noteText.trim().length > 0 || listOfItems.length > 0) {
            onSave({title: noteTitle, text: noteText, tags: selectedNoteTagIds, list: listOfItems});
        }
    };

    const addListItem = (userInput) => {
        if (userInput) {
            const newItem = {
            id: nanoid(),
            item: userInput
            };
            setListOfItems([...listOfItems, newItem]);
        }
    }

    const updateListOfItems = (id, value) => {
        const newListOfItems = listOfItems.map(item => {
            if (item.id === id) {
                return { ...item, item: value };
            }
            return item;
        });
        setListOfItems(newListOfItems);
    }

    const removeItem = (event, id) => {
        if (event.key === 'Backspace' && event.target.value.length === 0) {
            setListOfItems([...listOfItems.filter((item) => item.id !== id)]);
        }
    }
    
    return (
        <div className='popup__bg' onClick={onClose}>
            <div className="popup" onClick={(event) => event.stopPropagation()}>
                <div className="popup-content">
                    <div className="popup-close-wrapper">
                        <button className='note-icons-button note-button' onClick={onClose}>
                            <IoMdClose size='2rem'/>
                        </button>
                    </div>
                    <input 
                        className="popup-input title"
                        type="text"
                        name="title" 
                        id="note-title" 
                        placeholder="Title" 
                        value={noteTitle} 
                        onChange={event => setNoteTitle(event.target.value)}
                    />
                    <div className="content-description">
                        <textarea 
                            className="popup-input content" 
                            type="text" 
                            name="content" 
                            id="note-content" 
                            placeholder="Type to add a note..." 
                            rows="4" 
                            cols="50" 
                            value={noteText} 
                            onChange={event => setNoteText(event.target.value)}>
                        </textarea>
                        <ListForm addListItem={addListItem} />
                        <ul className="popup-unordered-list">
                            {listOfItems.map(item => {
                                return <li key={item.id}>
                                    <input 
                                        type="text" 
                                        value={item.item} 
                                        onChange={event => updateListOfItems(item.id, event.target.value)} 
                                        onKeyDown={event => removeItem(event, item.id)}
                                    />
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="popup-tags">
                        <TagList 
                            classes={'classesPopup'} 
                            selectedNoteTagIds={selectedNoteTagIds} 
                            setSelectedNoteTagIds={setSelectedNoteTagIds}
                        />
                        <button className='popup-button' onClick={handleSaveNote}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;