import { PubSubEngine } from 'graphql-subscriptions';
import { SessionService } from './session.service';
import { Session } from './session.model';
export declare class SessionResolver {
    private readonly sessionService;
    private pubSub;
    constructor(sessionService: SessionService, pubSub: PubSubEngine);
    sessions(): Promise<Session[]>;
    session(id: string): Promise<Session | null>;
    createSession(name: string): Promise<Session>;
    joinSession(sessionId: string): Promise<Session | null>;
    leaveSession(sessionId: string): Promise<Session | null>;
    endSession(sessionId: string): Promise<boolean>;
    sessionCreated(): any;
    sessionUpdated(): any;
    sessionEnded(): any;
}
