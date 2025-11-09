import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type SessionDocument = Session & Document;

@ObjectType()
@Schema()
export class Session {
  @Field(() => ID)
  _id: string;

  @Field(() => ID, { name: 'id' })
  get id(): string {
    return this._id.toString();
  }

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  hostId: string;

  @Field(() => String, { nullable: true })
  hostName?: string;

  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  participants: string[];

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: true })
  isActive: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
