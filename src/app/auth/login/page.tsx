"use client";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema as formSchema } from "@/lib/Schema";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { trpc } from "@/tRPC/client/client";

export default function MyForm() {
	const router = useRouter();
	const session = trpc.getSession.useQuery();
	if (session.data?.user) {
		redirect("/user/dashboard");
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { data, error } = await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					callbackURL: "/user/dashboard",
				},
				{
					onRequest: () => {
						toast.loading("logging in user...");
					},
					onSuccess: () => {
						toast.success("User logged in successfully");
						form.reset();
						router.push("/");
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				}
			);
			console.log(values);
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to signup user. Please try again.");
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Toaster />
			<div className="w-[450px] h-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-4 px-10 rounded-lg">
				<h4 className="text-2xl font-bold">Welcome Back!</h4>
				<p className="text-muted-foreground">
					Glad to see you again! Please enter your details to continue where you
					left off.
				</p>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 max-w-3xl mx-auto py-10"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Eg . Luffy@example.com"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										provide your email for authorization{" "}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput placeholder="*********" {...field} />
									</FormControl>
									<FormDescription>Enter your password.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-1">
							<p className="">Don&apos;t have an account?</p>
							<Link href={"/auth/signup"} className="text-blue-600">
								signup
							</Link>
						</div>

						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
