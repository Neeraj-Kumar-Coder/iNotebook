import NoteContext from '../context/notes/noteContext';
import NoteItem from "./NoteItem";
import "./Notes.css";
import { useContext } from 'react';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    const colors = ["#FFC93C", "#FF7B54", "#FFB26B", "#0081C9", "#5BC0F8", "#86E5FF", "#FEA1BF", "#E5BA73", "#FFCAC8", "#68B984", "#5F8D4E"];
    const numberOfColors = colors.length;
    return (
        <>
            <h1 id="notes-container-title">Your Notes</h1>
            <div className="notes-container">
                {
                    notes.map((note, index) => {
                        return <NoteItem note={note} color={colors[index % numberOfColors]} />
                    })
                }
            </div>
        </>
    )
}

export default Notes;