import Axios from "./caller.service"

let newRdv = (infos) => {
    return Axios.post('/appointment/new', infos)
}

let getAllRdvs = () => {
    return Axios.get('/appointment/all')
}

let getRdvsByPatientId = (id) => {
    return Axios.get(`/appointment/all/${id}`)
}

let getOneRdv = (id) => {
    return Axios.get(`/appointment/${id}`)
}

let updateRdv = (id, payload) => {
    return Axios.put(`/appointment/${id}`, payload)
}

let deleteRdv = (id) => {
    return Axios.delete(`/appointment/${id}`)
}

export const rdvService = {
    newRdv, getAllRdvs, getRdvsByPatientId, getOneRdv, updateRdv, deleteRdv
}