import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const filterNotes = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(filterNotes);

  const renderNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      removeNote={props.removeNote}
    />
  );
  const noteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
