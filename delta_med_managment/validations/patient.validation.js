import joi from "joi";

export default function patientValidation(body){
    const patientCreate = joi.object({
      gender: joi.string().required(),
      lastname: joi.string().required(),
      firstname: joi.string().required(),
      inseeCode: joi.number().required(),
      address: joi.string().required(),
      zipCode: joi.string().required(),
      town: joi.string().required(),
      email: joi.string(),
      phoneNumber: joi.string().required(),
      tpLastname: joi.string().empty('').default(null).optional(),
      tpFirstname: joi.string().empty('').default(null).optional(),
      tpPhoneNumber: joi.string().empty('').default(null).optional(),
      socialSecurity: joi.string().empty('').default(null).optional(),
      healthInsurance: joi.string().empty('').default(null).optional(),
      primaryDoctor: joi.string().empty('').default(null).optional(),
      secretary: joi.string()
    })

    const patientUpdate = joi.object({
      gender: joi.string(),
      lastname: joi.string(),
      firstname: joi.string(),
      inseeCode: joi.number(),
      address: joi.string(),
      zipCode: joi.string(),
      town: joi.string(),
      email: joi.string(),
      phoneNumber: joi.string(),
      tpLastname: joi.string().empty('').default(null).optional(),
      tpFirstname: joi.string().empty('').default(null).optional(),
      tpPhoneNumber: joi.string().empty('').default(null).optional(),
      socialSecurity: joi.string().empty('').default(null).optional(),
      healthInsurance: joi.string().empty('').default(null).optional(),
      primaryDoctor: joi.string().empty('').default(null).optional(),
      secretary: joi.string()
    })

    return {
        patientCreate: patientCreate.validate(body),
        patientUpdate: patientUpdate.validate(body),
    }
}
