import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
    servings: Number,
    savedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recipe', recipeSchema);
