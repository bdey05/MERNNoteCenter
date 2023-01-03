import axios from 'axios'

const baseURL = 'http://localhost:3001/api/users'

const createUser = (username, password) => {
    axios.post(baseURL, {username, password}).then(res => res.data)
}

export { createUser }
