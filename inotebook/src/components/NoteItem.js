import React, { useContext, useState } from 'react'
import "./NoteItem.css"
import NoteContext from '../context/notes/noteContext';
import ViewModal from './ViewModal';

const NoteItem = (props) => {
    const { note, color } = props;
    const context = useContext(NoteContext);
    const [show, setShow] = useState(false);
    const { deleteNote } = context;

    const viewToggler = () => {
        setShow(show ^ true);
    }

    return (
        <>
            <ViewModal note={note} color={color} show={show} viewToggler={viewToggler} />
            <div key={note._id} className="note-item" style={{ backgroundColor: color }}>
                <p className="watermark">iNotebook</p>
                <h2 className="title">{note.title}</h2>
                <h6 className="date">(Last Edited On: {String(new Date(note.date).toLocaleString())})</h6>
                <p className="description">{note.description}</p>
                <div className="note-overlay">
                    <div className="note-overlay-item-wrapper" onClick={viewToggler}>
                        <img className="note-overlay-item-img" src="./icons/view-icon.png" alt="view-icon"></img>
                        <span className="note-overlay-item-desc">View</span>
                    </div>
                    <div className="note-overlay-item-wrapper">
                        <img className="note-overlay-item-img" src="./icons/edit-icon.png" alt="edit-icon"></img>
                        <span className="note-overlay-item-desc">Edit</span>
                    </div>
                    <div className="note-overlay-item-wrapper" onClick={() => { deleteNote(note._id) }}>
                        <img className="note-overlay-item-img" src="./icons/delete-icon.png" alt="delete-icon"></img>
                        <span className="note-overlay-item-desc">Delete</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;