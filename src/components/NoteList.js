import Note from "./Note/Note";
import './App/App.scss';

const NoteList = ({ notes, handleOpenNoteEditor, onFavorite, onDelete }) => {

  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <Note 
          key={index}
          note={note}
          handleOpenNoteEditor={handleOpenNoteEditor}
          onFavorite={onFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NoteList;