import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    date: {
      type: Date
    },
    address: {
      type: String,
      required: true,
      default: "12 rue des tulipes 22100 Dinan"
    },
    reason: {
      type: String,
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryDoctor"
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

export default mongoose.model('Appointment', appointmentSchema);
