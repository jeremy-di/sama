import joi from "joi";

export default function appointmentValidation(body){
    const appointmentCreate = joi.object({
      date: joi.date(),
      address: joi.string(),
      reason: joi.string().required(),
      patient: joi.string(),
      doctor: joi.string()
    })

    const appointmentUpdate = joi.object({
      date: joi.date(),
      address: joi.string(),
      reason: joi.string(),
      patient: joi.string(),
      doctor: joi.string()
    })

    return {
        appointmentCreate: appointmentCreate.validate(body),
        appointmentUpdate: appointmentUpdate.validate(body),
    }
}
