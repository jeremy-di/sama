import joi from "joi";
export default function trainerFilesValidation(body){
    const trainerFilesCreate = joi.object({
      designation: joi.string().required(),
      name: joi.string().required(),
      patient: joi.string().required(),
    
    })

    return {
        trainerFilesCreate: trainerFilesCreate.validate(body),
    }
}
