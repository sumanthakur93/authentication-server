// auth validator utils

const {z} = require('zod');

const registerSchema = z.object({
    username: z
    .string({required_error:"UserName is required"})
    .trim().min(3, {message:"Name must be at least of 3 characters"})
    .max(255, {message:"Name must not be more than 255 characters"}),

    email: z
    .string({required_error:"Email is required"})
    .email({message:"Invalid email address"})
    .trim()
    .min(7, {message:"Email must be at least of 3 characters"})
    .max(255, {message:"Email must not be more than 255 characters"}),

    password: z
    .string({required_error:"Password is required"})
    .trim()
    .min(6, {message:"Password must be at least of 6 characters"})
    .max(14, {message: "Password must not be more than 14 characters"})
})


const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required"})
    .email({message:"Invalid email address"})
    .trim()
    .min(7, {message:"Email must be at least of 3 characters"})
    .max(255, {message:"Email must not be more than 255 characters"}),

    password: z
    .string({required_error:"Password is required"})
    .trim()
    .min(6, {message:"Password must be at least of 6 characters"})
    .max(14, {message: "Password must not be more than 14 characters"})
})

module.exports = {registerSchema, loginSchema};