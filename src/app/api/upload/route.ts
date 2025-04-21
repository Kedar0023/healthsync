import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const s = await auth.api.getSession({
			headers: await headers(),
		});
		const session = s?.user;

		console.log(session);

		if (!session?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return new NextResponse("No file provided", { status: 400 });
		}

		// Convert file to base64
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

		// Upload to Cloudinary
		const result = await cloudinary.uploader.upload(fileBase64, {
			folder: "healthsync_profiles",
		});

		// Update user profile in database
		await prisma.user.update({
			where: {
				email: session.email,
			},
			data: {
				image: result.secure_url,
			},
		});

		return NextResponse.json({
			success: true,
			url: result.secure_url,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
