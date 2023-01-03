import axios from 'axios'

const baseURL = 'http://localhost:3001/api/login'

const login = async (username, password) => {
    const res = await axios.post(baseURL, {username, password})
    const item = res.data
    return item
}

export { login }
