import Modal from '@mui/material/Modal';
import './formmodal.css'
import { MdClose } from 'react-icons/md'
import { createNote, updateNote } from '../../services/notes';


const FormModal = ({open, setOpen, handleClose, notes, setNotes, title, setTitle, content, setContent, formtitle, id}) => {
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const note = {title, content}
        if (formtitle === "Create"){
            createNote(note)
            setNotes(notes.concat(note))
            setTitle("")
            setContent("")
        }
        else {
            updateNote(id, note)
            setNotes(notes.concat(note))
        }
        setOpen(false)

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="modal"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">   
            <div className="formdiv">
                <button className="close" onClick={() => setOpen(false)}><MdClose /></button>
                <h2 className="formtitle">{formtitle} Note</h2>
                <form className="formmodal" onSubmit={handleSubmit}>
                    <input required className="textfield" type="text" placeholder="Title" value={title} onChange={handleTitleChange}/>   
                    <textarea required className="textfield" id="content" type="text" placeholder="Content" value={content} onChange={handleContentChange}/>      
                    <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
                    <button className="submit" type="submit">{formtitle}</button>
                </form>
            </div>
        </Modal>
    )
}

export default FormModal