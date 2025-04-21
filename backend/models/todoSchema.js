import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required : [true, "Please Provide Your Title"],
        minLength: [3, "Title must contain at least 3 characters"],
        maxLength: [50, "Title cannot exceed 10 characters"]
    },
    description: {
        type: String,
        required : [true, "Please Provide Your Description"],
        minLength: [10, "Description must contain at least 10 characters"],
        maxLength: [100, "Description  cannot exceed 30 characters"]
    },
    cdate: {
        type: Date,
        required: [true, "Please Select Estimation Complete time"],
    },
    priority: {
        type: String,
        enum: ["3", "2", "1"],
        default: "3"
    },
    favourite: {
        type: Boolean,
        default: false
    },
    complete: {
        type: Boolean,
        default: false
    },
    remind: {
        type: Boolean,
        default: false
    },
    rdate: {
        type: Date,
        required: function() {
            return this.remind; // require remindDateTime if remind is true
        }
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

todoSchema.pre("save", function(next) {
    if (!this.remind) {
        this.remindDateTime = undefined; // If remind is false, unset remindDateTime
    }
    next();
});

export const Todo = mongoose.model("Todo", todoSchema);