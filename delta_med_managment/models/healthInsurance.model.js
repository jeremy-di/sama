import mongoose from 'mongoose';

const healthInsuranceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, { timestamps: true });

export default mongoose.model('HealthInsurance', healthInsuranceSchema);
