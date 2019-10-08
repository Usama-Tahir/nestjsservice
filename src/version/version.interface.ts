import {Document} from 'mongoose';
import {Widget} from '../widget';

export interface Version extends Document {
    Version: string;
    General:
    {
        Title: string,
        Tagline: string,
        Category: string,
        Status: string,
    };
    MarketplaceListing: {
        PriceTier: string,
        // Images: [string, string],
    };
    Description: string;
    EndpointReferences: [];
    Widgets: Widget[];
    Active: Boolean;
}
