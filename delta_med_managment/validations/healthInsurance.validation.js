import joi from "joi";

export default function healthInsuranceValidation(body){
    const healthInsuranceCreate = joi.object({
      name: joi.string().required()
    })

    const healthInsuranceUpdate = joi.object({
      name: joi.string()
    })

    return {
        healthInsuranceCreate: healthInsuranceCreate.validate(body),
        healthInsuranceUpdate: healthInsuranceUpdate.validate(body),
    }
}
