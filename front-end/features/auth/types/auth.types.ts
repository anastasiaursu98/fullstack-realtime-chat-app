export type SignUpData = {
    fullName: string;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type User = {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
}

export enum AuthStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    AUTHENTICATED = 'authenticated',
    UNAUTHENTICATED = 'unauthenticated',
}