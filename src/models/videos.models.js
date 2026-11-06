import mongoose, {Schema} from  'mongoose'

import mongooseaggregatePAginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
{
    videofile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required:true
    },

    tittle: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    duration: {
        type: Number,   
        required: true,
    },

    viewa: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: boolean,
        default: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps: true})


videoSchema.plugin(mongooseaggregatePAginate)

export const Video = mongoose.model("Video", videoSchema)