import {Document} from 'mongoose';

export interface Widget extends Document {
    Name: string;
    Title: string;
    Subtitle: string;
    Type: string;
    Endpoint: string;
    Values: [];
}
