import "./ViewModal.css";

const ViewModal = (props) => {
    const { note, color, show, viewToggler } = props;

    return (
        <>
            <div className="view-overlay" style={{ visibility: show ? "visible" : "hidden", opacity: show ? 1 : 0 }} onClick={viewToggler}>
            </div>
            <div className="view-container" style={{ backgroundColor: color, visibility: show ? "visible" : "hidden", opacity: show ? 1 : 0 }}>
                <span id="view-cross" onClick={viewToggler}>✖</span>
                <p className="watermark">iNotebook</p>
                <h6 className="date">(Last Edited On: {String(new Date(note.date).toLocaleString())})</h6>
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <span><b>Tags:</b> {JSON.parse(note.tag)}</span>
            </div>
        </>
    )
}

export default ViewModal;