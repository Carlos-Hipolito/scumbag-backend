import { Schema } from "mongoose";

export const TaskSchema = new Schema ({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    totalbrl: {type: Number, required: true},
    totaltime: {type: Number, required: true},
    dateandtime: {type: Number, required: true},
    obs: {type: String, required: false},
})