import mongoose from 'mongoose';

const trainerFilesSchema = new mongoose.Schema({
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
    }

}, { timestamps: true });

export default mongoose.model('TrainerFiles', trainerFilesSchema);
