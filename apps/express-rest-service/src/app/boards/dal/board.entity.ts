import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';

export interface IBoardEntity extends Document {
  title: string;
  columns: unknown[];
}

const schema: Schema = new Schema({
  title: { type: SchemaTypes.String, required: true, trim: true },
  columns: { type: SchemaTypes.Array, required: true, default: [] },
});

export const BoardEntity: Model<IBoardEntity> = model<IBoardEntity>('board', schema, 'boards', true);
