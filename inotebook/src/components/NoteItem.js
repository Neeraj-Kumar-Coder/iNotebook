import React from 'react'
import "./NoteItem.css"

const NoteItem = (props) => {
    const { note, color } = props;
    return (
        <div className="note-item" style={{ backgroundColor: color }}>
            <p className="watermark">iNotebook</p>
            <h2 className="title">{note.title}</h2>
            <h6 className="date">(Last Edited On: {String(new Date(note.date).toLocaleString())})</h6>
            <p className="description">{note.description}</p>
            <div className="note-overlay">
                <div className="note-overlay-item-wrapper">
                    <img className="note-overlay-item-img" src="./icons/view-icon.png" alt="view-icon"></img>
                    <span className="note-overlay-item-desc">View</span>
                </div>
                <div className="note-overlay-item-wrapper">
                    <img className="note-overlay-item-img" src="./icons/edit-icon.png" alt="edit-icon"></img>
                    <span className="note-overlay-item-desc">Edit</span>
                </div>
                <div className="note-overlay-item-wrapper">
                    <img className="note-overlay-item-img" src="./icons/delete-icon.png" alt="delete-icon"></img>
                    <span className="note-overlay-item-desc">Delete</span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;