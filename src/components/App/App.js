import './App.scss';
import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import MainContent from '../MainContent/MainContent';
import Navigation from '../Navigation/Navigation';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('react-notes-app-data')) || []);
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = ({title, text, tags, list}) => {
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      favorite: false,
      delete: false,
      tags: tags,
      list: list
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const updateNote = (newNote) => {
    setNotes(notes.map(note => note.id === newNote.id ? {...note, ...newNote} : note));
  }

  const makeNoteFavorite = (id) => {
    const note = notes.find((note) => note.id === id);

    updateNote({...note, favorite: !note.favorite});
  };

  const completelyDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    const note = notes.find((note) => note.id === id);

    if (note.delete) {
      completelyDeleteNote(id);
    } else {
      updateNote({...note, delete: true});
    }
  };

  const handleSelectedLink = (link) => {
    setActivePage(link);
  };

  const sortNotesByActivePage = (note) => {
    if (activePage === 'favorites') {
      return note.favorite === true;
    } else if (activePage === 'trash') {
      return note.delete === true;
    } else {
      return note.delete !== true;
    }
  }

  const selectedTagsSet = new Set(selectedTags);

  const sortNotesByTags = (note) => 
    selectedTags.length === 0 
    || note.tags.some(tag => selectedTagsSet.has(tag));

  const sortNotesBySearchText = (note) => 
    note.text.toLowerCase().includes(searchText) 
    || note.title.toLowerCase().includes(searchText) 
    || note.list.some(item => item.item.includes(searchText));


  const sortedNotes = notes
    .filter(sortNotesBySearchText)
    .filter(sortNotesByTags)
    .filter(sortNotesByActivePage);

  return (
    <div className="App">
      <Navigation setSearchText={setSearchText} onActive={handleSelectedLink}/>
      <MainContent 
        notes={sortedNotes} 
        updateNote={updateNote} 
        addNote={addNote} 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags}
        onFavorite={makeNoteFavorite}
        onDelete={deleteNote}
      />
    </div>
  );
}

export default App;