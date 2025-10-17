import mongoose from 'mongoose';

const primaryDoctorSchema = new mongoose.Schema({
    lastname: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    speciality: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, { timestamps: true });

export default mongoose.model('PrimaryDoctor', primaryDoctorSchema);
