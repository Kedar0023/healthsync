import { z } from "zod";

export const signupSchema = z.object({
	email: z.string().email("Invalid Email Format"),
	name: z
		.string()
		.min(3, "Name must be at least 3 characters long")
		.max(20, "Name must be at most 20 characters long"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(20, "Password must be at most 20 characters long"),
});

export const loginSchema = signupSchema.pick({ email: true, password: true });

export const verifyUser = z.object({
	mailed_otp: z.string(),
	otp: z.string(),
});
