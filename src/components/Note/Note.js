import React from "react";
import "./Note.scss";
import { GoTrash } from "react-icons/go";
import { FaStar } from "react-icons/fa";

const Note = ({ note, handleOpenNoteEditor, onFavorite, onDelete }) => {

    const noteIndicatorHeight = 100 / note.tags.length;

    const indicatorHeightClass = {
        height: `${noteIndicatorHeight}%`,
    };

    const coloredStarClass = {
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
        strokeWidth: '50px'
    };

    const starClasses = note.favorite ? coloredStarClass : "star-icon";

    return (
        <div className="note" id={note.id} onClick={(event) => event.stopPropagation()}>
            <ul className="note-indicator">
                {note.tags.map((tag, index) => (
                    <li
                        key={index}
                        style={indicatorHeightClass}
                        className={`${tag}-tag indicator-color`}
                    ></li>
                ))}
            </ul>
            <div className="note-content" onClick={()=>handleOpenNoteEditor(note)}>
                <div className={`note-field note-title ${note.title ? '' : 'hidden'}`}>
                    {note.title}
                </div>
                <div className={`note-field note-text ${note.text ? '' : 'hidden'}`}>
                    {note.text}
                </div>
                <ul className={`unordered-list ${note.list.length > 0 ? '' : 'hidden'}`}>
                    {note.list.map((item, index)=><li key={index}>{item.item}</li>)}
                </ul>
            </div>
            <div className="note-icons">
                <button
                className="note-button note-icons-button"
                id="delete-button"
                onClick={() => onDelete(note.id)}
                >
                    <GoTrash size="1.5rem" />
                </button>
                <button
                className="note-button  note-icons-button"
                id="favorite-button"
                disabled={note.delete}
                onClick={() => onFavorite(note.id)}
                >
                    <FaStar className={starClasses} size="1.5rem" />
                </button>
            </div>
        </div>
  );
};

export default Note;