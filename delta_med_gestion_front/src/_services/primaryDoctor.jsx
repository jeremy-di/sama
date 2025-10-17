import Axios from "./caller.service"

let newprimaryDoctor = (infos) => {
    return Axios.post('/primarydoctor/new', infos)
}

let getAllprimaryDoctors = () => {
    return Axios.get('/primarydoctor/all')
}

let getOneprimaryDoctor = (id) => {
    return Axios.get(`/primarydoctor/${id}`)
}

let updateprimaryDoctor = (id, payload) => {
    return Axios.put(`/primarydoctor/${id}`, payload)
}

let deleteprimaryDoctor = (id) => {
    return Axios.delete(`/primarydoctor/${id}`)
}

export const primaryDoctorService = {
    newprimaryDoctor, getAllprimaryDoctors, getOneprimaryDoctor, updateprimaryDoctor, deleteprimaryDoctor
}