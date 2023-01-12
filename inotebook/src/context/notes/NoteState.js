import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:4000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    // Fetching all the notes
    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMWUwZTA2NTE5N2MwZjRiNzY1OTRjIn0sImlhdCI6MTY2MjI5MDk4NH0.6PiI7N69uta42Po6K1EBOtQ4yR-D5HbDqM_bCi9NJOc"
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Adding a note
    const addNote = async (note) => {
        // Joining the space separated tags with ',' before saving to the database
        note.tag = JSON.stringify(note.tag.split(" ").join(", "));

        // Logic to save a note to the backend
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMWUwZTA2NTE5N2MwZjRiNzY1OTRjIn0sImlhdCI6MTY2MjI5MDk4NH0.6PiI7N69uta42Po6K1EBOtQ4yR-D5HbDqM_bCi9NJOc"
            },
            body: JSON.stringify(note)
        });
        const json = await response.json();

        // Logic to show that note has been added successfully in the frontend (client side)
        fetchAllNotes();
    }

    // Updating a note
    const updateNote = () => {
        ;
    }

    // Deleting a note
    const deleteNote = async (noteIdToBeDeleted) => {
        // Logic to delete the note in the backend
        const response = await fetch(`${host}/api/notes/deleteNote/${noteIdToBeDeleted}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMWUwZTA2NTE5N2MwZjRiNzY1OTRjIn0sImlhdCI6MTY2MjI5MDk4NH0.6PiI7N69uta42Po6K1EBOtQ4yR-D5HbDqM_bCi9NJOc"
            }
        });

        const json = await response.json();

        // Logic to show that note has been deleted in the frontend (client side)
        setNotes(notes.filter((note) => { return note._id !== noteIdToBeDeleted }));
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;