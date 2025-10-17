import joi from "joi";

export default function socialSecurityValidation(body){
    const socialSecurityCreate = joi.object({
      name: joi.string().required()
    })

    const socialSecurityUpdate = joi.object({
      name: joi.string()
    })

    return {
        socialSecurityCreate: socialSecurityCreate.validate(body),
        socialSecurityUpdate: socialSecurityUpdate.validate(body),
    }
}
