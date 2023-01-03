import './deletebutton.css'
import {MdDelete} from 'react-icons/md'
import { deleteNote } from '../../services/notes'

const DeleteButton = ({notes, setNotes, id}) => {

    const handleDelete = () => {
        deleteNote(id)
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <button className="delete" onClick={() => handleDelete()}>
            <MdDelete />
        </button>
    )
}

export default DeleteButton