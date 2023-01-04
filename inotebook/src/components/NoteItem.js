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
        </div>
    )
}

export default NoteItem;