// export const BASE_URL = "https://willow-408319.uw.r.appspot.com/api";
export const BASE_URL = "http://localhost:5000/api"
export const BASE_STORAGE_BUCKET_URL = "https://storage.cloud.google.com/willow-conversation-assets";
export const END_USER = "end_user";
export const AI_COACH = "ai_coach";
export const DEV = "dev";
export const PROD = "prod";

// message types
export const TEXT = 'text';
export const IMAGE = 'image';
export const AUDIO = 'audio';

export const SUPPORTED_FILE_TYPES = {
    'image': 'image',
    'audio': 'audio'
}

// natural state of application is loaded. once we fetch something, set state to loading
// it should resolve to either failure or success. this is a prompt to do something to get back 
// to LOADED state
export const LOADING_STATES = {
    SUCCESS: 'SUCCESS', // default state
    PENDING: 'PENDING', // loading something
    LOADED: 'LOADED',  // loaded resource, but not sure if correct. For any logic we can do either way
    FAILED: 'FAILED',  // failed to load resource, handle error
};
