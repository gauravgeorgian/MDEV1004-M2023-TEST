import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Building document.
 */
export interface Building extends Document {
  name: string;
  type: string;
  dateBuilt: string;
  city: string;
  country: string;
  description: string;
  architects: string[];
  cost: string;
  website: string;
  imageURL: string;
}

// Define the building schema
const buildingSchema: Schema = new mongoose.Schema({
  name: String,
  type: String,
  dateBuilt: String,
  city: String,
  country: String,
  description: String,
  architects: [String],
  cost: String,
  website: String,
  imageURL: String,
});

// Create and export the building model
export default mongoose.model<Building>('Building', buildingSchema);
