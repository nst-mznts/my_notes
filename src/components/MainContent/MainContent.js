import React, { useState } from "react";
import "./MainContent.scss";
import NoteList from "../NoteList";
import TagList from '../TagList/TagList';
import ModalWindow from '../ModalWindow/ModalWindow';
import { LiaPlusSolid } from "react-icons/lia";

function MainContent({ notes, updateNote, addNote, selectedTags, setSelectedTags, onFavorite, onDelete }) {
  const [closing, setClosing] = useState(false);
  const [openedNote, setOpenedNote] = useState({});

  const handleCloseModalWindow = () => {
    setClosing(false);
    setOpenedNote({});
  }

  const handleOpenModalWindow = (note = {}) => {
    setClosing(true);
    setOpenedNote(note);
  }

  const handleSaveNote = (newNote) => {
    openedNote.id ? updateNote({...newNote, id: openedNote.id}) : addNote(newNote);
    handleCloseModalWindow();
  }

  return (
    <main className="main">
      {closing && <ModalWindow 
        openedNote={openedNote}
        onSave={handleSaveNote}
        onClose={handleCloseModalWindow}
      />}
      <div className="wrapper">
        <section className="main-header">
          <button className="note-button add-button" onClick={() => handleOpenModalWindow()}>
            <LiaPlusSolid size="2em" />
          </button>
          <TagList 
            classes={'classesHeader'}
            selectedNoteTagIds={selectedTags}
            setSelectedNoteTagIds={setSelectedTags}
          />
        </section>
        <section className="main-content">
            <NoteList
              notes={notes}
              handleOpenNoteEditor={handleOpenModalWindow}
              onFavorite={onFavorite}
              onDelete={onDelete}
            />
        </section>
      </div>
    </main>
  );
}

export default MainContent;