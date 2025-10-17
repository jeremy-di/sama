import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
      password: joi.string().required(),
      login: joi.string().required(),
      role: joi.string().required()
    })

    const userUpdate = joi.object({
      email: joi.string().email(),
      password: joi.string(),
      login: joi.string(),
      role: joi.string()
    })

    const userLogin = joi.object({
      login: joi.string(),
      password: joi.string(),
    })

    return {
        userCreate: userCreate.validate(body),
        userUpdate: userUpdate.validate(body),
        userLogin: userLogin.validate(body),
    }
}
