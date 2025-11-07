import { Document } from 'mongoose';
export type SessionDocument = Session & Document;
export declare class Session {
    _id: string;
    get id(): string;
    name: string;
    hostId: string;
    participants: string[];
    createdAt: Date;
    isActive: boolean;
}
export declare const SessionSchema: import("mongoose").Schema<Session, import("mongoose").Model<Session, any, any, any, Document<unknown, any, Session, any, {}> & Session & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Session, Document<unknown, {}, import("mongoose").FlatRecord<Session>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Session> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
