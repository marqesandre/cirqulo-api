import { Schema, model, Document } from 'mongoose';

interface IKPI extends Document {
  type: string;
  count: number;
}

const KPISchema = new Schema<IKPI>({
  type: { type: String, required: true, unique: true },
  count: { type: Number, required: true },
});

export default model<IKPI>('KPI', KPISchema);