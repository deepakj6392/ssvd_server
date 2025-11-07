"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ENDPOINTS = void 0;
exports.createApiResponse = createApiResponse;
exports.createErrorResponse = createErrorResponse;
exports.API_ENDPOINTS = {
    USERS: "/api/users",
    AUTH: "/api/auth",
    SESSIONS: "/api/sessions",
    SIGNALING: "/api/signaling",
};
function createApiResponse(data) {
    return {
        success: true,
        data,
    };
}
function createErrorResponse(error) {
    return {
        success: false,
        error,
    };
}
//# sourceMappingURL=index.js.map