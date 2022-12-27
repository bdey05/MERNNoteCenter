import axios from 'axios'

const baseURL = 'http://localhost:3001/api/notes'

const getNotes = () => {
    axios.get(baseURL).then(res => res.data)
}

const createNote = note => {
    axios.post(baseURL, note).then(res => res.data)
}

const deleteNote = id => {
    axios.delete(`${baseURL}/${id}`).then(res => res.data)
}

const updateNote = (id, newNote) => {
    axios.put(`${baseURL}/${id}`, newNote).then(res => res.data)
}

export { getNotes, createNote, deleteNote, updateNote }
