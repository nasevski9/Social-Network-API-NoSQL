const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            get: (createdAt)=>{
                return `${createdAt.toDateString()} at ${createdAt.toLocaleTimeString()}`
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction],
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getteers: true
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;