import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema(
  {
    slug:       { type: String, required: true, unique: true, index: true },
    title:      { type: String, required: true },
    excerpt:    { type: String, required: true },
    body:       { type: String, default: '' },
    category:   { type: String, default: 'Field Notes' },  // "Studio Visit", "Process", etc.
    image:      { type: String, required: true },
    publishedAt:{ type: Date, required: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.model('JournalEntry', JournalEntrySchema);
