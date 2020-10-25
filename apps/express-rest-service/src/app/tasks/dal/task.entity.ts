import { Document, Model, model, Schema, SchemaTypes } from 'mongoose';
import { BoardEntity } from '../../boards/dal/board.entity';
import { UserEntity } from '../../users/dal/user.entity';

export interface ITaskEntity extends Document {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

const schema: Schema = new Schema({
  title: { type: SchemaTypes.String, required: true, trim: true },
  order: { type: SchemaTypes.Number, required: true, default: 0 },
  description: { type: SchemaTypes.String, required: true, trim: true },
  userId: { type: SchemaTypes.ObjectId, required: true, ref: UserEntity },
  boardId: { type: SchemaTypes.ObjectId, required: true, ref: BoardEntity },
  columnId: { type: SchemaTypes.ObjectId, required: true },
});

export const TaskEntity: Model<ITaskEntity> = model<ITaskEntity>('task', schema, 'tasks', true);
