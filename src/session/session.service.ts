import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async createSession(name: string, hostId: string): Promise<Session> {
    const session = new this.sessionModel({
      name,
      hostId,
      participants: [hostId],
    });
    return session.save();
  }

  async getSessionById(id: string): Promise<Session | null> {
    return this.sessionModel.findById(id).exec();
  }

  async getActiveSessions(): Promise<Session[]> {
    return this.sessionModel.find({ isActive: true }).exec();
  }

  async joinSession(
    sessionId: string,
    userId: string,
  ): Promise<Session | null> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session || !session.isActive) return null;

    if (!session.participants.includes(userId)) {
      session.participants.push(userId);
      await session.save();
    }
    return session;
  }

  async leaveSession(
    sessionId: string,
    userId: string,
  ): Promise<Session | null> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session) return null;

    session.participants = session.participants.filter((id) => id !== userId);
    if (session.participants.length === 0) {
      session.isActive = false;
    }
    await session.save();
    return session;
  }

  async endSession(sessionId: string, hostId: string): Promise<boolean> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session || session.hostId !== hostId) return false;

    session.isActive = false;
    await session.save();
    return true;
  }
}
