import { FaPlus } from 'react-icons/fa'
import FormModal from '../FormModal/FormModal'
import './createbutton.css'
import { useState } from 'react';

const CreateButton = ({notes, setNotes}) => {

    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    return (
        <div>
        <button className="create" onClick={() => handleOpen()}>
            <FaPlus className="plus"></FaPlus> 
            Create Note
        </button>
        <FormModal open = {open} setOpen = {setOpen} handleClose = {handleClose} notes = {notes} setNotes = {setNotes} title={title} setTitle = {setTitle} content = {content} setContent = {setContent} formtitle="Create"/>
        
      </div>
    )
}

export default CreateButton