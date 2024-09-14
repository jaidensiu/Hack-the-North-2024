import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
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

// export const createNewRequest = mutation({
//     args: { text: v.string() },
//     handler: async (ctx, args) => {
//         const taskId = await ctx.db.insert("requests", { text: args.text });
//         // do something with `taskId`
//     },
// });

// export const createNewSession = mutation({
//     args: { text: v.string() },
//     handler: async (ctx, args) => {
//         const taskId = await ctx.db.insert("sessions", { text: args.text });
//         // do something with `taskId`
//     },
// });