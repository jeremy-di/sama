import joi from "joi";
export default function secretaryFilesValidation(body){
    const secretaryFilesCreate = joi.object({
      designation: joi.string().required(),
      name: joi.string().required(),
      patient: joi.string().required(),
      secretary: joi.string()
    
    })

    return {
        secretaryFilesCreate: secretaryFilesCreate.validate(body),
    }
}
