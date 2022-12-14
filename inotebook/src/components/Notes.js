import { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from "./NoteItem";
import "./Notes.css";

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes } = context;
    useEffect(() => { fetchAllNotes() }, []);
    const colors = ["#FFC93C", "#FF7B54", "#FFB26B", "#0081C9", "#5BC0F8", "#86E5FF", "#FEA1BF", "#E5BA73", "#FFCAC8", "#68B984", "#5F8D4E"];
    const numberOfColors = colors.length;
    return (
        <>
            <h1 id="notes-container-title">Your Notes</h1>
            <div className="notes-container">
                {
                    notes.map((note, index) => {
                        return <NoteItem key={note._id} note={note} color={colors[index % numberOfColors]} />
                    })
                }
            </div>
        </>
    )
}

export default Notes;