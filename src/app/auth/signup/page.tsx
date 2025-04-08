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
import { signupSchema as formSchema } from "@/lib/Schema";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/tRPC/client/client";

export default function MyForm() {
	const router = useRouter();
	const session = trpc.getSession.useQuery();
	if (session.data?.user) {
		redirect("/");
	}
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { data, error } = await authClient.signUp.email(
				{
					email: values.email,
					password: values.password,
					name: values.password,

					callbackURL: "/",
				},
				{
					onRequest: () => {
						toast.loading("Signing up user...");
					},
					onSuccess: () => {
						toast.success("User signed up successfully");
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
				<h4 className="text-2xl font-bold">Join the Community!</h4>
				<p className="text-muted-foreground">
					We&apos;re excited to have you! Just fill in your details below and
					let&apos;s get started.
				</p>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 max-w-3xl mx-auto py-10"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>name</FormLabel>
									<FormControl>
										<Input placeholder="Ex. Luffy" type="" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

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
						<div className="flex items-center gap-1 ">
							<p className="">Already have an account?</p>
							<Link href={"/auth/login/"} className="text-blue-600">
								Login
							</Link>
						</div>

						<Button type="submit" className="w-full">
							Signup
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
