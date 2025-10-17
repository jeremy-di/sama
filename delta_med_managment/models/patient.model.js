import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    gender: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    inseeCode: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    town: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String,
      required: true
    },
    tpLastname: {
      type: String
    },
    tpFirstname: {
      type: String
    },
    tpPhoneNumber: {
      type: String
    },
    socialSecurity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialSecurity"
    },
    primaryDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryDoctor"
    },
    healthInsurance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthInsurance"
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);
