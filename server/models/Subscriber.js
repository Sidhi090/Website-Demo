import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema(
  {
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    subscribedAt: { type: Date, default: Date.now },
    source:       { type: String, default: 'website-footer' },
  },
  { timestamps: true }
);

export default mongoose.model('Subscriber', SubscriberSchema);
