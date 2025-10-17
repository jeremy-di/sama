import Axios from "./caller.service"

let newHealthInsurance = (infos) => {
    return Axios.post('/healthinsurance/new', infos)
}

let getAllHealthInsurances = () => {
    return Axios.get('/healthinsurance/all')
}

let getOneHealthInsurance = (id) => {
    return Axios.get(`/healthinsurance/${id}`)
}

let updateHealthInsurance = (id, payload) => {
    return Axios.put(`/healthinsurance/${id}`, payload)
}

let deleteHealthInsurance = (id) => {
    return Axios.delete(`/healthinsurance/${id}`)
}

export const healthInsuranceService = {
    newHealthInsurance, getAllHealthInsurances, getOneHealthInsurance, updateHealthInsurance, deleteHealthInsurance
}