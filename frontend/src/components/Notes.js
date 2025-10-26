import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  // Add a new note
  const addNote = async () => {
    await axios.post("http://localhost:5000/api/notes", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  // Delete a note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Create a New Note</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={addNote}>Add Note</button>

      <h2>All Notes</h2>
      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
