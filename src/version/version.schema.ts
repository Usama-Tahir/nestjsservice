import * as mongoose from 'mongoose';

export const VersionSchema = new mongoose.Schema({
    Version: String,
    General:
    {
        Title: String,
        Tagline: String,
        Category: String,
        Status: String,
    },
    MarketplaceListing: {
        PriceTier: String,
        // Images: [Image, Image],
    },
    Description: String,
    EndpointReferences: [],
    Widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
    Active: Boolean
});
