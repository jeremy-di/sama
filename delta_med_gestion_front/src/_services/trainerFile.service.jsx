import Axios from "./caller.service"

let newTrainerFile = (infos) => {
    return Axios.post('/trainerfiles/new', infos)
}

let getAllTrainerFiles = () => {
    return Axios.get('/trainerfiles/all')
}

let getTrainerFilesByPatientId = (id) => {
    return Axios.get(`/trainerfiles/all/${id}`)
}

let getOneTrainerFile = (id) => {
    return Axios.get(`/trainerfiles/${id}`)
}

let updateTrainerFile = (id, payload) => {
    return Axios.put(`/trainerfiles/${id}`, payload)
}

let deleteTrainerFile = (id) => {
    return Axios.delete(`/trainerfiles/${id}`)
}

export const trainerFileService = {
    newTrainerFile, getAllTrainerFiles, getTrainerFilesByPatientId, getOneTrainerFile, updateTrainerFile, deleteTrainerFile
}