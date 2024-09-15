import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

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

export const updateUserSessionHistory = mutation({
    args: { id: v.id("users"), sessionHistory: v.array(v.id("sessions")) },
    handler: async (ctx, args) => {
        const id = args.id;
        const sessionHistory = args.sessionHistory;
        await ctx.db.patch(id, { sessionHistory: sessionHistory });
    },
});

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
        overallRating: v.int64()
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
            overallRating: args.overallRating
        });
        return userID;
    },
});

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

export const createNewSession = mutation({
    args: {
        studentID: v.id("users"),
        tutorID: v.id("users"),
        studentsFeedback: v.string(),
        studentsRating: v.int64(),
        tutorsFeedback: v.string(),
        tutorsRating: v.int64()
    },
    handler: async (ctx, args) => {
        const sessionID = await ctx.db.insert("sessions", {
            studentID: args.studentID,
            tutorID: args.tutorID,
            studentsFeedback: args.studentsFeedback,
            studentsRating: args.studentsRating,
            tutorsFeedback: args.tutorsFeedback,
            tutorsRating: args.tutorsRating
        });


        return sessionID;
    },
});