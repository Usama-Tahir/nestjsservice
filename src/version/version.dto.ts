import {Widget} from '../widget';

export class VersionDto {
    Version: string;
    General:
        {
            Title: string,
            Tagline: string,
            Category: string,
        };
    MarketplaceListing: {
        PriceTier: string,
        // Images: [string, string],
    };
    Description: string;
    EndpointReferences: [];
    Widgets: Widget[];
}
