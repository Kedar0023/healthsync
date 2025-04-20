import { google } from "@ai-sdk/google";
import { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import { generateText } from "ai";

import {route ,procedure} from "./trpc" 
import { systemInstructions } from "@/lib/systum_instructions_for_AI";
import { z } from "zod";

const AI_routes = route({
	generateWithAI: procedure
		.input(z.object({ prompt: z.string() }))
		.mutation(async ({ input }): Promise<string> => {
			try {
				const { text } = await generateText({
					model: google("gemini-1.5-pro-latest"),
					providerOptions: {
						google: {
							responseModalities: ["TEXT"],
						} satisfies GoogleGenerativeAIProviderOptions,
					},
					messages: [
						{
							role: "system",
							content: systemInstructions,
						},
						{
							role: "user",
							content: input.prompt,
						},
					],
				});
				return text;
			} catch (err) {
				throw new Error(
					err instanceof Error
						? err.message
						: "Failed to generate or parse response"
				);
			}
		}),
});
export default AI_routes