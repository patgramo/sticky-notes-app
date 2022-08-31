import React, { Component } from "react";
import { render } from "react-dom";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [],
    searchText: ""
  };

  //create a new note
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  //updates the sticky note UI when someone types in the title or desc
  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId is the id of the note that is edited
    //updatedKey is the updated title or description field
    //updatedValue is the value of the title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  //updates the UI to show only notes that are included in search
  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        if (titleMatch) {
          note.doesMatchSearch = true;
        } else if (descriptionMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stateString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stateString);
  }
  componentDidMount() {
    const stateString = localStorage.getItem("savedNotes");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState({ notes: savedState });
    }
  }
  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
