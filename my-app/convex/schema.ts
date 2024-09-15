import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phoneNumber: v.string(),
        type: v.string(),
        age: v.int64(),
        topic: v.string(),
        sessionHistory: v.array(v.id("sessions")),
        overallRating: v.int64(),
        password: v.string()
    }),
    profile: defineTable({
        userID: v.id("users"),
        picture: v.id("_storage"),
        bio: v.string(),
        gender: v.string()
    }).index('userID', ['userID']),
    location: defineTable({
        userID: v.id("users"),
        latitude: v.float64(),
        longitude: v.float64()
    }).index('userID', ['userID']),
    sessions: defineTable({
        studentID: v.id("users"),
        tutorID: v.id("users"),
        studentsFeedback: v.string(),
        studentExercises: v.optional(v.string()),
        studentsRating: v.int64(),
        tutorsFeedback: v.string(),
        tutorsAIFeedback: v.optional(v.string()),
        tutorsRating: v.int64(),
    }).index('studentID', ['studentID'])
    ,
    requests: defineTable({
        studentID: v.id("users"),
        lat: v.float64(),
        long: v.float64(),
        isRequestAccepted: v.boolean(),
    }).index('studentID', ["studentID"])

});