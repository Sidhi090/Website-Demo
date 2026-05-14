import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    slug:       { type: String, required: true, unique: true, index: true },
    name:       { type: String, required: true },
    collection: { type: String, enum: ['noir', 'blanc'], required: true, index: true },
    category:   { type: String, enum: ['outerwear', 'tops', 'bottoms', 'accessories', 'dresses'], required: true, index: true },
    pieceNo:    { type: Number, required: true },          // 01, 02, ... within its collection
    priceJPY:   { type: Number, required: true },
    image:      { type: String, required: true },          // primary product image URL
    tag:        { type: String, default: '' },             // "New" | "Limited" | ""
    description:{ type: String, default: '' },
    fabric:     { type: String, default: '' },
    care:       { type: String, default: '' },
    order:      { type: Number, default: 0 },              // sort within selected-pieces
  },
  { timestamps: true }
);

ProductSchema.index({ order: 1, createdAt: -1 });

export default mongoose.model('Product', ProductSchema);
