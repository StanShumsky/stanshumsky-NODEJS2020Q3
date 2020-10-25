import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';

export interface IUserEntity extends Document {
  name: string;
  login: string;
  password: string;
}

const schema: Schema = new Schema({
  name: { type: SchemaTypes.String, required: true, trim: true },
  login: { type: SchemaTypes.String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: SchemaTypes.String, required: true, trim: true },
});

export const UserEntity: Model<IUserEntity> = model<IUserEntity>('user', schema, 'users', true);
