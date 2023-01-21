const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type:String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
            match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );
    
    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    });
    
    const User = model('User', userSchema);
    
    module.exports = User;