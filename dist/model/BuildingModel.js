"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the building schema
const buildingSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Building', buildingSchema);
