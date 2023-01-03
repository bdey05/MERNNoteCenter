import './editbutton.css'
import {MdEdit} from 'react-icons/md'
import FormModal from '../FormModal/FormModal'
import { useState } from 'react';

const EditButton = ({notes, setNotes, oldTitle, oldContent, id}) => {

    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const [title, setTitle] = useState(oldTitle)
    const [content, setContent] = useState(oldContent)

    const handleEdit = () => {
       setOpen(true)
    }
    
    return (
        <div>
        <button className="edit" onClick={() => handleEdit()}>
            <MdEdit />
        </button>
        <FormModal open = {open} setOpen = {setOpen} handleClose = {handleClose} notes = {notes} setNotes = {setNotes} title={title} setTitle = {setTitle} content = {content} setContent = {setContent} formtitle="Update" id = {id}/>
        </div>
        
    )
}

export default EditButton