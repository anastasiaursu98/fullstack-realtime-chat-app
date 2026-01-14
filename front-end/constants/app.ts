/**
 * Application-wide constants
 */

export const ROUTE_SEGMENTS = {
    CHAT_ID_INDEX: 2,
} as const;

export const AVATAR_SIZES = {
    SMALL: 32,
    MEDIUM: 40,
    LARGE: 64,
} as const;

export const SOCKET_EVENTS = {
    NEW_MESSAGE: 'newMessage',
    USER_ONLINE: 'userOnline',
    USER_OFFLINE: 'userOffline',
} as const;
