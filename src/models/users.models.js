import mongoose, {Schema} from  'mongoose'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema(
    {

        username: {

            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname: {

            type:String,
            required: true,
            trim: true,
            index: true,
        },

        avatar: {

            type:String,
            required: true
        },

        coverImage: {

            type:String,

        },

        watchHistory:{
            type: Schema.type.objectId,
            ref: "Video"
        },

      password: {
        type: String,
        required: [true, "PAssword is required"],
      } ,

      refreshToken: {
        type: String,
      }

}, 

{timestamps: true})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

            //  JWT token generation

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username:  this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_IN
        }
    )
}


UserSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )

}

export const User = mongoose.model("User", UserSchema)