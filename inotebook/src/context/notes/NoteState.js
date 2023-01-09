import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "63a9a8ef4ac83720f5076204",
            "user": "6311e0e065197c0f4b76594c",
            "title": "Blue Card",
            "description": "What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment.",
            "tag": "Personal",
            "date": "2022-12-26T14:00:15.774Z",
            "__v": 0
        },
        {
            "_id": "63a9a8ef4ac83720f5076204",
            "user": "6311e0e065197c0f4b76594c",
            "title": "Blue Card",
            "description": "What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment.",
            "tag": "Personal",
            "date": "2022-12-26T14:00:15.774Z",
            "__v": 0
        },
        {
            "_id": "63a9a8ef4ac83720f5076204",
            "user": "6311e0e065197c0f4b76594c",
            "title": "Blue Card",
            "description": "What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment.",
            "tag": "Personal",
            "date": "2022-12-26T14:00:15.774Z",
            "__v": 0
        },
        {
            "_id": "63a9a8ef4ac83720f5076204",
            "user": "6311e0e065197c0f4b76594c",
            "title": "Blue Card",
            "description": "What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment.",
            "tag": "Personal",
            "date": "2022-12-26T14:00:15.774Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes);

    // Adding a note
    const addNote = (note) => {
        console.log("New Note Added!");
        setNotes(notes.concat(note));
    }

    // Updating a note
    const updateNote = () => {
        ;
    }

    // Deleting a note
    const deleteNote = () => {
        ;
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;