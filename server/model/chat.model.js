import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        sentAt: {
            type: Date,
            default: Date.now
        },
        edited: {
            type: Boolean,
            default: false
        },
        isRead: {
            type: Boolean,
            default: false
        }
    }]
    
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;