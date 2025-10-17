import joi from "joi";

export default function notificationValidation(body){
    const notificationCreate = joi.object({
      appointment: joi.string(),
      patient: joi.string(),
      secretary: joi.string()
    })

    const notificationUpdate = joi.object({
      appointment: joi.string(),
      patient: joi.string(),
      secretary: joi.string()
    })

    return {
        notificationCreate: notificationCreate.validate(body),
        notificationUpdate: notificationUpdate.validate(body),
    }
}
