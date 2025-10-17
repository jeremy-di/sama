import mongoose from 'mongoose';

const socialSecuritySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    secretary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, { timestamps: true });

export default mongoose.model('SocialSecurity', socialSecuritySchema);
