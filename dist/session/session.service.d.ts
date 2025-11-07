import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.model';
export declare class SessionService {
    private sessionModel;
    constructor(sessionModel: Model<SessionDocument>);
    createSession(name: string, hostId: string): Promise<Session>;
    getSessionById(id: string): Promise<Session | null>;
    getActiveSessions(): Promise<Session[]>;
    joinSession(sessionId: string, userId: string): Promise<Session | null>;
    leaveSession(sessionId: string, userId: string): Promise<Session | null>;
    endSession(sessionId: string, hostId: string): Promise<boolean>;
}
