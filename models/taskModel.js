import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: 0,
            required: false
        }
    },{
        timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;