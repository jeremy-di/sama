import Axios from "./caller.service"

let newPatient = (infos) => {
    return Axios.post('/patient/new', infos)
}

let getAllPatients = () => {
    return Axios.get('/patient/all')
}

let getOnePatient = (id) => {
    return Axios.get(`/patient/${id}`)
}

let updatePatient = (id, payload) => {
    return Axios.put(`/patient/${id}`, payload)
}

let deletePatient = (id) => {
    return Axios.delete(`/patient/${id}`)
}

export const patientService = {
    newPatient, getAllPatients, getOnePatient, updatePatient, deletePatient
}