import { SelectFeatures } from "@/db/schema";

export type BasicTrackInfo = {
    track_name: string;
    track_artist: string;
};

export type Playlist = {
    id: string;
    url: string;
};

export type PromptHref = {
    pathname: string;
    query: {
        userId: number;
        prompt?: string;
    };
}

export type ButtonState = 'idle' | 'loading' | 'done' | 'error';


export type PricingPlan = {
    name: string;
    id: number;
    created_at: Date;
    credits: number;
    preHeader: string | null;
    price: string;
    features: SelectFeatures[];
};
