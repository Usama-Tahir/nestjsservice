import * as mongoose from 'mongoose';

export const WidgetSchema = new mongoose.Schema({
    Name: String,
    Title: String,
    Subtitle: String,
    Type: String,
    Endpoint: String,
    Values: [],
});
