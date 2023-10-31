export type BasicTrackInfo = {
    track_name: string;
    track_artist: string;
};

export type Playlist = {
    id: string;
    url: string;
};

export type ButtonState = 'idle' | 'loading' | 'done' | 'error';