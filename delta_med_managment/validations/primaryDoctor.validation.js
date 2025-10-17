import joi from "joi";

export default function primaryDoctorValidation(body){
    const primaryDoctorCreate = joi.object({
      lastname: joi.string().required(),
      firstname: joi.string().required(),
      speciality: joi.string().required(),
      phoneNumber: joi.string().required()
    })

    const primaryDoctorUpdate = joi.object({
      lastname: joi.string(),
      firstname: joi.string(),
      speciality: joi.string(),
      phoneNumber: joi.string()
    })

    return {
        primaryDoctorCreate: primaryDoctorCreate.validate(body),
        primaryDoctorUpdate: primaryDoctorUpdate.validate(body),
    }
}
