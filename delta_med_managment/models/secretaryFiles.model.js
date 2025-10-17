import mongoose from 'mongoose';

const secretaryFilesSchema = new mongoose.Schema({
    designation: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

}, { timestamps: true });

export default mongoose.model('SecretaryFiles', secretaryFilesSchema);
