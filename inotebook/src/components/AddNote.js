import React, { useState, useContext, useRef } from 'react';
import "./AddNote.css";
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const context = useContext(NoteContext);
    const { addNote } = context;
    const titleRef = useRef();
    const descriptionRef = useRef();
    const tagRef = useRef();

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const handleSave = (event) => {
        event.preventDefault();
        addNote(note);
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        tagRef.current.value = "";
    }

    return (
        <div className="add-note">
            <h1 id="add-note-title">Take Your Notes Here</h1>
            <form id="note-form">
                <div className="note-form-item-wrapper">
                    <label htmlFor="title">Title</label>
                    <input ref={titleRef} type="text" name="title" id="title" placeholder="Give Your Note A Title" onChange={onChange}></input>
                </div>
                <div className="note-form-item-wrapper">
                    <label htmlFor="description">Description</label>
                    <textarea ref={descriptionRef} type="text" name="description" id="description" rows={10} cols={30} placeholder="Write Something That You Want To Note" onChange={onChange}></textarea>
                </div>
                <div className="note-form-item-wrapper">
                    <label htmlFor="tag">Tag</label>
                    <input ref={tagRef} type="text" name="tag" id="tag" placeholder="Put Some 'Space Separated' Tags For Your Note (eg: Health Jogging Music)" onChange={onChange}></input>
                </div>
                <div className="note-form-item-wrapper">
                    <button type="submit" className="btn" id="save-note-btn" onClick={handleSave}></button>
                    <button type="reset" className="btn" id="clear-note-btn"></button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;