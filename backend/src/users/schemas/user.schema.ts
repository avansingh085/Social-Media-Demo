import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ Document, Types } from 'mongoose';

export type UserDocument = User & Document;

// user.schema.ts

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  following: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followRequests: Types.ObjectId[]; // Users who want to follow me
}

export const UserSchema = SchemaFactory.createForClass(User);
