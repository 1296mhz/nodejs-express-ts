import mongoose from 'mongoose';
import {ITask} from './Task';
const Schema: any = mongoose.Schema;
 
const taskScheme = new Schema({
    title: String,
    description: String,
    completed: Boolean,
});

taskScheme.virtual('id').get(function(this: any){
  return this._id.toHexString();
});

taskScheme.set('toJSON', {
  virtuals: true
});

const TaskModel = mongoose.model<ITask>("TaskModel", taskScheme);

export default TaskModel;