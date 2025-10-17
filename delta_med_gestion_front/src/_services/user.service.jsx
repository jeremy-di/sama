import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/staff/login', credentials)
}

let register = (credentials) => {
    return Axios.post('/staff/register', credentials)
}

let getAllUsers = () => {
    return Axios.get('/staff/all')
}

let updateMyPassword = (credentials) => {
    return Axios.patch('/staff/updatemypass', credentials)
}

let getOneUser = (id) => {
    return Axios.get(`/staff/${id}`)
}

let getMe = () => {
    return Axios.get('/staff/profil/me')
}

let updateUser = (id, payload) => {
    return Axios.put(`/staff/${id}`, payload)
}

let deleteUser = (id) => {
    return Axios.delete(`/staff/${id}`)
}

let saveToken = (token => {
    localStorage.setItem('token', token)
})

let getToken = () => {
    return localStorage.getItem('token')
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let saveRole = (role) => {
    localStorage.setItem('role', role)
}

let getRole = () => {
    let role = localStorage.getItem('role')
    return role
}

export const userService = {
    login, register, getAllUsers, getOneUser, updateUser, deleteUser, getMe, updateMyPassword, saveToken, getToken, logout, isLogged, saveRole, getRole
}