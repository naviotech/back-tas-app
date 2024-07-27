import mongoose, {Schema, Document, Types} from 'mongoose'

export enum taskStatus  {
  PENDING= 'pending',
  ON_HOLD= 'onHold',
  IN_PROGRESS= 'inProgress',
  UNDER_REVIEW= 'underReview',
  COMPLETED= 'completed'
} 


export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: taskStatus
}

export const TaskSchema : Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING,
    required: true
  }
},{timestamps: true})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task