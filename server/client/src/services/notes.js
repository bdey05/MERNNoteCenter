import axios from 'axios'

const baseURL = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getNotes = () => {
    axios.get(baseURL).then(res => res.data)
}

const createNote = note => {
    const config = {
        headers: { Authorization: token },
    }
    axios.post(baseURL, note, config).then(res => res.data)
}

const deleteNote = id => {
    const config = {
        headers: { Authorization: token },
    }
    axios.delete(`${baseURL}/${id}`, config).then(res => res.data)
}

const updateNote = (id, newNote) => {
    axios.put(`${baseURL}/${id}`, newNote).then(res => res.data)
}

export { getNotes, createNote, deleteNote, updateNote, setToken }
