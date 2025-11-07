export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export interface Session {
    id: string;
    name: string;
    hostId: string;
    participants: string[];
    createdAt: Date;
    isActive: boolean;
}
export interface Message {
    id: string;
    sessionId: string;
    userId: string;
    content: string;
    timestamp: Date;
}
export interface SignalingMessage {
    type: "offer" | "answer" | "ice-candidate";
    sessionId: string;
    fromUserId: string;
    toUserId: string;
    data: any;
}
export declare const API_ENDPOINTS: {
    readonly USERS: "/api/users";
    readonly AUTH: "/api/auth";
    readonly SESSIONS: "/api/sessions";
    readonly SIGNALING: "/api/signaling";
};
export declare function createApiResponse<T>(data: T): ApiResponse<T>;
export declare function createErrorResponse(error: string): ApiResponse<never>;
