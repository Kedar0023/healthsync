import { auth } from "@/lib/auth";
import { procedure, route } from "./trpc";
import { headers } from "next/headers";

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
});

export type AppRouter = typeof approuter;
