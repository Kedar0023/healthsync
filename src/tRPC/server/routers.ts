import { auth } from "@/lib/auth";
import { procedure, route } from "./trpc";
import { headers } from "next/headers";
import userRouter from "./userRoutes";
import { z } from "zod";
import prisma from "@/lib/prisma";
import AI_routes from "./generate_with_AI";
export const approuter = route({
	// sayhi: procedure.query(() => {
	// 	return { message: "hi, There !" };
	// }),
	getSession: procedure.query(async () => {
		const session = await auth.api.getSession({
			// NOTE
			headers: await headers(),
		});
		return session;
	}),
	logout: procedure.mutation(async () => {
		auth.api.signOut({
			headers: await headers(),
		});
	}),

	user: userRouter,
	AI : AI_routes,
	getUserData: procedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: { id: input.userId },
				include: {
					medicalRecords: true,
					insurances: true,
					appointments: true,
					prescriptions: true,
				},
			});

			if (!user) {
				throw new Error("User not found");
			}

			return user;
		}),
});

export type AppRouter = typeof approuter;
