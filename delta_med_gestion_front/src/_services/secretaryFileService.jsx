import Axios from "./caller.service"

let newSecretaryFile = (infos) => {
    return Axios.post('/secretaryfiles/new', infos)
}

let getAllSecretaryFiles = () => {
    return Axios.get('/secretaryfiles/all')
}

let getSecretaryFilesByPatientId = (id) => {
    return Axios.get(`/secretaryfiles/all/${id}`)
}

let getOneSecretaryFile = (id) => {
    return Axios.get(`/secretaryfiles/${id}`)
}

let updateSecretaryFile = (id, payload) => {
    return Axios.put(`/secretaryfiles/${id}`, payload)
}

let deleteSecretaryFile = (id) => {
    return Axios.delete(`/secretaryfiles/${id}`)
}

export const secretaryFileService = {
    newSecretaryFile, getAllSecretaryFiles, getSecretaryFilesByPatientId, getOneSecretaryFile, updateSecretaryFile, deleteSecretaryFile
}