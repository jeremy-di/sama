import Axios from "./caller.service"

let newSocialSecurity = (infos) => {
    return Axios.post('/socialsecurity/new', infos)
}

let getAllSocialSecuritys = () => {
    return Axios.get('/socialsecurity/all')
}

let getOneSocialSecurity = (id) => {
    return Axios.get(`/socialsecurity/${id}`)
}

let updateSocialSecurity = (id, payload) => {
    return Axios.put(`/socialsecurity/${id}`, payload)
}

let deleteSocialSecurity = (id) => {
    return Axios.delete(`/socialsecurity/${id}`)
}

export const socialSecurityService = {
    newSocialSecurity, getAllSocialSecuritys, getOneSocialSecurity, updateSocialSecurity, deleteSocialSecurity
}