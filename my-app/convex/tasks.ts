import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Gets all the users and all thir information from the database
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

export const getTutors = query({
    args: { topic: v.string() },
    handler: async (ctx, args) => {
        const type = "tutor"
        const topic = args.topic
        return await ctx.db.query("users")
            // .filter((q) => q.eq(q.field("topic"), topic))
            .filter((q) => q.eq(q.field("type"), type)).collect();

    },
});

// For login buttion
// input: email string and whether or not the login button has been pressed yet
// output: 1 user object that matches the email string
// Get user based on email
export const getUser = query({
    args: { email: v.string(), enabled: v.boolean() },
    handler: async (ctx, args) => {
        const email = args.email
        const enabled = args.enabled
        if (enabled) {
            return await ctx.db.query("users")
                .filter((q) => q.eq(q.field("email"), email)).first();
        } else {
            return null;
        }

    },
});

// Adds a session to a student/tutors history
// input: user id and array of sessions
export const updateUserSessionHistory = mutation({
    args: { id: v.id("users"), sessionHistory: v.array(v.id("sessions")) },
    handler: async (ctx, args) => {
        const id = args.id;
        const sessionHistory = args.sessionHistory;
        await ctx.db.patch(id, { sessionHistory: sessionHistory });
    },
});

export const updateTutorFeedback = mutation({
    args: { sessionID: v.id("sessions"), feedback: v.string() },
    handler: async (ctx, args) => {
        const sessionID = args.sessionID;
        const feedback = args.feedback;
        await ctx.db.patch(sessionID, { tutorsFeedback: feedback });
    },
});

export const updateTutorRating = mutation({
    args: { sessionID: v.id("sessions"), rating: v.int64() },
    handler: async (ctx, args) => {
        const sessionID = args.sessionID;
        const rating = args.rating;
        await ctx.db.patch(sessionID, { tutorsRating: rating });
    },
});

export const updateStudentFeebdack = mutation({
    args: { sessionID: v.id("sessions"), feedback: v.string() },
    handler: async (ctx, args) => {
        const sessionID = args.sessionID;
        const feedback = args.feedback;
        await ctx.db.patch(sessionID, { studentsFeedback: feedback });
    },
});

export const updateStudentRating = mutation({
    args: { sessionID: v.id("sessions"), rating: v.int64() },
    handler: async (ctx, args) => {
        const sessionID = args.sessionID;
        const rating = args.rating;
        await ctx.db.patch(sessionID, { studentsRating: rating });
    },
});

// Creates a new user
export const createNewUser = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const userID = await ctx.db.insert("users", {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            phoneNumber: args.phoneNumber,
            type: args.type,
            age: args.age,
            topic: args.topic,
            sessionHistory: [],
            overallRating: args.overallRating,
            password: args.password
        });
        return userID;
    },
});

// Creates a new request
export const createNewRequest = mutation({
    args: {
        studentID: v.id("users"),
        lat: v.float64(),
        long: v.float64(),
        isRequestAccepted: v.boolean()
    },
    handler: async (ctx, args) => {
        const requestID = await ctx.db.insert("requests", {
            studentID: args.studentID,
            lat: args.lat,
            long: args.long,
            isRequestAccepted: args.isRequestAccepted
        });

        return requestID;
    },
});

// Creates a new session
export const createNewSession = mutation({
    args: {
        studentID: v.id("users"),
        tutorID: v.id("users"),
        studentsFeedback: v.string(),
        studentExercises: v.optional(v.string()),
        studentsRating: v.int64(),
        tutorsFeedback: v.string(),
        tutorsAIFeedback: v.optional(v.string()),
        tutorsRating: v.int64()
    },
    handler: async (ctx, args) => {
        const sessionID = await ctx.db.insert("sessions", {
            studentID: args.studentID,
            tutorID: args.tutorID,
            studentsFeedback: args.studentsFeedback,
            studentExercises: args.studentExercises ?? "",
            studentsRating: args.studentsRating,
            tutorsFeedback: args.tutorsFeedback,
            tutorsAIFeedback: args.tutorsAIFeedback ?? "",
            tutorsRating: args.tutorsRating
        });


        return sessionID;
    },
});

export const updateSessionFeedback = mutation({
    args: { id: v.id("sessions"), studentExercises: v.string(), tutorsAIFeedback: v.string()},
    handler: async (ctx, args) => {
        const id = args.id;
        const studentExercises = args.studentExercises;
        const tutorsAIFeedback = args.tutorsAIFeedback;
        await ctx.db.patch(id, { studentExercises: studentExercises, tutorsAIFeedback: tutorsAIFeedback });
    },
});