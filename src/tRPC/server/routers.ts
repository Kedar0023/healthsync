import { procedure, route } from "./trpc";

export const approuter = route({
	sayhi: procedure.query(() => {
		return { message: "hi, There !" };
	}),
});

export type AppRouter = typeof approuter;
