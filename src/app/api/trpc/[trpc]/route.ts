import { approuter } from "@/tRPC/server/routers";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
	return fetchRequestHandler({
		endpoint: "/api/trpc/",
		router: approuter,
		req,
		createContext: () => ({}),
	});
};

export { handler as GET, handler as POST };
