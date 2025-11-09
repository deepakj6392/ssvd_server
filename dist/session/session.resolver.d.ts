import { PubSubEngine } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { SessionService } from './session.service';
import { Session } from './session.model';
import { UserDocument } from '../user/user.model';
export declare class SessionResolver {
    private readonly sessionService;
    private pubSub;
    private userModel;
    constructor(sessionService: SessionService, pubSub: PubSubEngine, userModel: Model<UserDocument>);
    sessions(): Promise<Session[]>;
    session(id: string): Promise<Session | null>;
    createSession(name: string, user: any): Promise<Session>;
    joinSession(sessionId: string, user: any): Promise<Session | null>;
    leaveSession(sessionId: string, user: any): Promise<Session | null>;
    endSession(sessionId: string, user: any): Promise<boolean>;
    sessionCreated(): any;
    sessionUpdated(): any;
    hostName(session: Session): Promise<string>;
    sessionEnded(): any;
}
